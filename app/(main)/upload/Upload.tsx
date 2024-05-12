'use client';

import axios from 'axios';
import { cn } from '#/lib/utils';
import Loader from 'react-ts-loaders';
import { Photo } from '@prisma/client';
import { SaveIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '#/lib/edgestore';
import { Button } from '#/components/ui/button';
import useExitPrompt from '#/hooks/useExitPrompt';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MultiFileDropzone, type FileState } from '#/components/MultiFileDropzone';
import { ImageMetadata, UploadResult, WorkerAction, WorkerResult, workersList } from '#/lib/types';


const Upload = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { edgestore } = useEdgeStore();
	const [_, setShowExitPrompt] = useExitPrompt(false);
	const generateImageMetadataWorker = useRef<Worker>();
	const saveButtonRef = useRef<HTMLButtonElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSaveDisabled, setIsSaveDisabled] = useState(true);
	const [fileStates, setFileStates] = useState<FileState[]>([]);
	const [isUploadDisabled, setIsUploadDisabled] = useState(false);
	const [isDatabaseUpdated, setIsDatabaseUpdated] = useState(false);
	const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
	const [imageMetadata, setImageMetadata] = useState<ImageMetadata[]>([]);

	// Setup Web Worker
	useEffect(() => {
		generateImageMetadataWorker.current = new Worker(new URL('workers/generateImageMetadata.ts', import.meta.url));
		generateImageMetadataWorker.current.onmessage = (e: MessageEvent<string>) => {
			const { data } = e.data as unknown as WorkerResult<ImageMetadata>;
			console.log('Image metadata received from worker :>>', data);
			setImageMetadata(imageMetadata => [...imageMetadata, data]);
		};

		// Cleaning up the Web Worker when the component unmounts
		return () => {
			generateImageMetadataWorker.current?.terminate();
			setShowExitPrompt(false);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (fileStates.length !== 0 && !isDatabaseUpdated) {
			setShowExitPrompt(true);
		} else setShowExitPrompt(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileStates, isDatabaseUpdated]);

	useEffect(() => {
		const pendingFiles = fileStates.filter(({ progress }) => typeof progress === 'number' && progress < 100 || progress === 'PENDING');
		const erroredFiles = fileStates.filter(state => state.progress === 'ERROR');

		if (pendingFiles.length === 0 && fileStates.length > erroredFiles.length) {
			setIsSaveDisabled(false);
		} else {
			setIsSaveDisabled(true);
		}

		if (saveButtonRef.current && fileStates.length > 0) {
			saveButtonRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileStates]);

	const updateFileProgress = (key: string, progress: FileState['progress']) => {
    setFileStates(fileStates => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(state => state.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
			
      return newFileStates;
    });
  }

	const clearFailedUploads = () => {
    setFileStates(fileStates => {
      const newFileStates = fileStates.filter(state => state.progress !== 'ERROR');
			
      return newFileStates;
    });
  }

	const savePhotosToDatabase = async () => {
		// Then, check if some files errored out. If yes, get a confirmation from user
		const erroredFiles = fileStates.filter(state => state.progress === 'ERROR');
		if (erroredFiles.length > 0) {
			const message = erroredFiles.length === 1
				? `An error occurred while uploading a file. Proceed?`
				: `An error occurred while uploading ${erroredFiles.length} files. Proceed?`;
	
			if (!confirm(message)) return;
		}
		
		const data = imageMetadata.map(result => {
			// TODO: Allow users enter metadata or use AI to generate it
			return {
				...result,
				title: 'Title',
				description: 'Description'
			}
		});

		console.log('Data :>>', data);

		// Proceed to upload
		try {
			setIsSubmitting(true);
			setIsUploadDisabled(true);

			const response = await axios.post<{ data: Photo[] }>('/api/photos/save', data);
			queryClient.invalidateQueries({ queryKey: ['eventPhotos'] });

			// Confirm Edgestore URLs
			await Promise.all(
				uploadResults.map(async ({ url }) => {
					await edgestore.eventPhotos.confirmUpload({ url });
				})
			);

			toast.success('Photos uploaded successfully!');
			
			setIsDatabaseUpdated(true);
			setShowExitPrompt(false);

			router.push('/');
		} catch (error) {
			console.log('Upload Error :>>', error);
			toast.error(`An error occurred while uploading your photos`);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className='flex-1 flex flex-col items-center gap-y-4 bg-gray-100 dark:bg-white/15 rounded-2xl p-5 sm:p-10 mb-4 h-full min-h-96'>
			<MultiFileDropzone
				value={fileStates}
				disabled={isUploadDisabled}
				dropzoneOptions={{
					accept: {
						'image/png': ['.png'],
						'image/jpg': ['.jpg'],
						'image/bmp': ['.bmp'],
						'image/jpeg': ['.jpeg'],
						'image/webp': ['.webp'],
						'image/tiff': ['.tiff']
					},
					maxFiles: 5,
					maxSize: 1024 * 1024 * 5 // 5 MB
				}}
				onFilesAdded={async (addedFiles) => {
					setFileStates([...fileStates, ...addedFiles]);
					await Promise.all(
						addedFiles.map(async (addedFileState) => {
							try {
								const imageResponse = await edgestore.eventPhotos.upload({
									file: addedFileState.file,
									options: { temporary: true },
									onProgressChange: async (progress) => {
										updateFileProgress(addedFileState.key, progress);
										if (progress === 100) {
											// wait 1 second to set it to complete
											// so that the user can see the progress bar
											await new Promise(resolve => setTimeout(resolve, 1000));
											updateFileProgress(addedFileState.key, 'COMPLETE');
										}
									},
								});

								const data = {
									url: imageResponse.url,
									preview: addedFileState.preview,
									file: addedFileState.file,
									thumbnailUrl: `${imageResponse.thumbnailUrl}`
								}

								setUploadResults(uploadResults => [ ...uploadResults, data ]);

								generateImageMetadataWorker.current?.postMessage({
									action: workersList.generateImageMetadata, data
								} as WorkerAction<UploadResult>);
							} catch (error) {
								updateFileProgress(addedFileState.key, 'ERROR');
							}
						})
					);
				}}
			/>

			<Button
				className={cn(
					'rounded-lg shadow-sm hidden',
					fileStates.filter(state => state.progress === 'ERROR').length > 0 && 'block'
				)}
				size='sm'
				variant='destructive'
				onClick={clearFailedUploads}
			>
				Clear failed uploads
			</Button>

			<Button
				variant='outline'
				ref={saveButtonRef}
				onClick={savePhotosToDatabase}
				disabled={isSaveDisabled || isUploadDisabled}
				className='h-10 p-1 rounded-full shadow-sm disabled:grayscale bg-core hover:bg-core-secondary'
			>
				<span className={cn('opacity-100 flex items-center', isSubmitting && 'opacity-0')}>
					<SaveIcon className='w-8 h-8 mr-2 p-1.5 rounded-full bg-white/25 text-white' />
					<span className='text-white pr-4 px-0'>Save</span>
				</span>
				{isSubmitting && (
					<div className='absolute flex items-center justify-center w-full h-full'>
						<Loader
							type='spinner'
							size={28}
							className='text-white leading-[0]'
						/>
					</div>
				)}
			</Button>
		</div>
	);
}

export default Upload;
