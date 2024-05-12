import { encode } from 'blurhash';
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateDefaultAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${seed}`;
};

export const protectedRoutes = ['/upload', '/settings', '/api/photos/save', '/api/settings/save'];

export const generateImageMetadata = async (dataURI: string): Promise<{
  blurhash: string;
  width: number;
  height: number;
}> => {
  const loadedImage = await fetch(dataURI).then(response => response.blob()).then(blob => createImageBitmap(blob));

  const canvas = new OffscreenCanvas(loadedImage.width, loadedImage.height);
  const context = canvas.getContext('2d');
  context?.drawImage(loadedImage, 0, 0);
  const imageData = context?.getImageData(0, 0, loadedImage.width, loadedImage.height);

  if (!imageData) throw Error('Could not render an image.');

  const result = {
    blurhash: encode(imageData.data, imageData.width, imageData.height, 4, 4),
    width: loadedImage.width,
    height: loadedImage.height
  };

  return result;
};

export const getImageDimensions = (dataURI: string): Promise<{ width: number; height: number }> => {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = function() {
      const dimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      resolve(dimensions);
    };
    
    img.src = dataURI;
  });
};
