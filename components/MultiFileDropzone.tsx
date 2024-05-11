'use client';

import {
	CheckCircleIcon,
  FileIcon,
  LucideFileWarning,
  Trash2Icon,
  UploadCloudIcon
} from 'lucide-react';
import * as React from 'react';
import { cn } from '#/lib/utils';
import { twMerge } from 'tailwind-merge';
import { Button } from '#/components/ui/button';
import { formatFileSize } from '@edgestore/react/utils';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';

const variants = {
  base: 'relative rounded-md p-4 w-full xs:w-96 flex justify-center items-center flex-col cursor-pointer border-2 border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
  active: 'border-gray-600',
  disabled: 'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-600 dark:border-gray-600',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type FileState = {
  file: File;
  key: string; // used to identify the file in the progress callback
  preview: string;
  progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
};

type InputProps = {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onFilesAdded, onChange },
    ref,
  ) => {
    const [customError, setCustomError] = React.useState<string>();
    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles;
    }
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        if (files) {
          const addedFiles = files.map<FileState>(file => ({
            file,
            key: Math.random().toString(36).slice(2),
            progress: 'PENDING',
            preview: file.type && file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
          }));
          void onFilesAdded?.(addedFiles);
          void onChange?.([...(value ?? []), ...addedFiles]);
        }
      },
      ...dropzoneOptions
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className='w-full flex flex-col gap-2 items-center'>
        {/* Main File Input */}
        <div {...getRootProps({ className: dropZoneClassName })}>
          <input ref={ref} {...getInputProps()} />
          <div className='flex flex-col items-center justify-center py-4 text-base gap-y-3.5'>
            <UploadCloudIcon className='h-12 w-12 bg-black/10 dark:bg-white/10 text-black dark:text-white p-3 rounded-full' />
            <div className='text-black dark:text-white font-medium'>
              Drag & drop files here
            </div>
            <div className='text-gray-400 text-xs relative w-full text-center'>
              <div className='absolute bg-gray-400 inset-x-0 top-[calc(50%-1px)] h-px -translate-y-1/2' />
              <span className='relative bg-gray-100 dark:bg-[#262626] p-1 rounded'>OR</span>
            </div>
            <Button className='rounded-lg shadow-sm' size='sm'>
              Upload files
            </Button>
          </div>
        </div>

        {/* Error Text */}
        <div className='mt-1 text-sm text-red-500'>
          {customError ?? errorMessage}
        </div>

        {/* Selected Files */}
        {value?.map(({ file, progress, preview }, i) => (
          <div
            key={i}
            className='flex h-16 w-full xs:w-96 flex-col justify-center rounded border border-gray-300 p-2'
          >
            <div className='flex items-center gap-2 text-gray-500 dark:text-white'>
              {/* TODO: Make a function to return an image preview or an icon depending on a file's mime type */}
              {file.type && file.type.startsWith('image/') ? (
                <div className='aspect-square h-12 w-12'>
                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                  <img src={preview} className='object-cover h-full w-full rounded' />
                </div>
              ): (
                <FileIcon size='48' className='shrink-0 stroke-1 p-2.5' />
              )}

              <div className='flex-1 flex flex-col overflow-hidden'>
                <div className='flex flex-row'>
                  <div className='min-w-0 text-sm'>
                    <div className='truncate'>
                      {file.name}
                    </div>
                    <div className='text-xs text-gray-400 dark:text-gray-400'>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <div className='grow' />
                  <div className='shrink-0 flex justify-end w-12 text-xs'>
                    {progress === 'PENDING' ? (
                      <button
                        className='p-1 transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
                        onClick={() => {
                          void onChange?.(
                            value.filter((_, index) => index !== i),
                          );
                        }}
                      >
                        <Trash2Icon className='shrink-0' />
                      </button>
                    ) : progress === 'ERROR' ? (
                      <LucideFileWarning className='text-red-600 shrink-0 dark:text-red-400' />
                    ) : progress !== 'COMPLETE' ? (
                      <div>{Math.round(progress)}%</div>
                    ) : (
                      <CheckCircleIcon className='text-green-600 shrink-0 dark:text-green-400' />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className='relative h-2.5'>
                  <div className='absolute w-full h-1 bg-gray-200 rounded-full top-1 overflow-clip dark:bg-gray-700'>
                    <div
                      className={cn(
                        'h-full transition-all duration-300 ease-in-out bg-core-secondary',
                        progress === 100 && 'bg-green-600 dark:bg-green-400',
                        progress === 'COMPLETE' && 'bg-green-600 dark:bg-green-400',
                        progress === 'ERROR' && 'bg-red-600 dark:bg-red-400 transition-none'
                      )}
                      style={{
                        width: typeof progress === 'number' ? `${progress}%` : progress === 'COMPLETE' || progress === 'ERROR' ? '100%' : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
);
MultiFileDropzone.displayName = 'MultiFileDropzone';

export { MultiFileDropzone };
