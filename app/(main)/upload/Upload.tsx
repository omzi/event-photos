'use client';

import { useEffect, useRef, useState } from 'react';
import { useEdgeStore } from '#/lib/edgestore';
import useExitPrompt from '#/hooks/useExitPrompt';
import { MultiFileDropzone, type FileState } from '#/components/MultiFileDropzone';
import { Button } from '#/components/ui/button';
import { SaveIcon } from 'lucide-react';

interface UploadResult {
	url: string;
	filename: string;
	thumbnailUrl: string;
}


const Upload = () => {
	const { edgestore } = useEdgeStore();
	const uploadPageRef = useRef<HTMLDivElement>(null);
	const [fileStates, setFileStates] = useState<FileState[]>([]);
	const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
	const [isUploadDisabled, setIsUploadDisabled] = useState(false);
	const [isDatabaseUpdated, setIsDatabaseUpdated] = useState(false);
	const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);

	useEffect(() => {
		return () => {
			setShowExitPrompt(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (fileStates.length !== 0 && !isDatabaseUpdated) {
			setShowExitPrompt(true);
		} else setShowExitPrompt(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileStates, isDatabaseUpdated]);

	useEffect(() => {
		if (uploadPageRef.current) {
			uploadPageRef.current.scrollIntoView({
				block: 'end',
				behavior: 'smooth'
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileStates]);

	const updateFileProgress = (key: string, progress: FileState['progress']) => {
    setFileStates(fileStates => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(fileState => fileState.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
			
      return newFileStates;
    });
  }

	return (
		<div ref={uploadPageRef} className='flex flex-col items-center'>
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

								setUploadResults(uploadResults => [
									...uploadResults,
									{
										url: imageResponse.url,
										filename: addedFileState.file.name,
										thumbnailUrl: `${imageResponse.thumbnailUrl}`
									}
								]);
							} catch (error) {
								updateFileProgress(addedFileState.key, 'ERROR');
							}
						}),
					);
				}}
			/>

			{/* {uploadResults.length > 0 && (
				<div className='mt-2'>
					{uploadResults.map(result => (
						<a
							key={result.url}
							className='block mt-2 underline'
							href={result.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							{result.filename}
						</a>
					))}
				</div>
			)} */}

			<Button disabled className='h-10 p-1 mt-4 rounded-full shadow-sm disabled:grayscale bg-core hover:bg-core-secondary' variant='outline'>
				<SaveIcon className='hidden xs:inline w-8 h-8 mr-2 p-1.5 rounded-full bg-white/25 text-white' />
				<span className='px-2 text-white xs:pr-4 xs:px-0'>Save</span>
			</Button>
		</div>
	);
}

export default Upload;
