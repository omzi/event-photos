import { generateImageMetadata } from '#/lib/utils';
import { ImageMetadata, UploadResult, WorkerAction, WorkerResult, workersList } from '#/lib/types';

addEventListener('message', async (e: MessageEvent<string>) => {
  const { action, data } = e.data as unknown as WorkerAction<UploadResult>;
  if (action !== workersList.generateImageMetadata) {
    return;
  }

  const imageMetadata = await generateImageMetadata(`${data.preview}`);
  const result = {
    ...imageMetadata,
    url: data.url,
    thumbnailUrl: data.thumbnailUrl
  };
  
  const response = { data: result } as WorkerResult<ImageMetadata>;

  postMessage(response);
});

export {};
