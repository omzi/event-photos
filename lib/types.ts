export enum workersList {
  generateImageMetadata = 'generateImageMetadata'
};

export type WorkerAction<T> = {
	action: workersList;
	data: T;
};

export type WorkerResult<T> = {
	data: T;
};

export interface UploadResult {
  url: string;
  preview?: string;
  file?: File;
  thumbnailUrl: string;
};

export interface ImageMetadata extends UploadResult {
  width: number;
  height: number;
  blurhash: string;
};
