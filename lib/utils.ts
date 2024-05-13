import { encode } from 'blurhash';
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { Photo } from '@prisma/client';

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

const generateNetlifySrcSet = (url: string, width: number, height: number, isAbsolute: boolean = true) => {
  const breakpoints = [2400, 1600, 1080, 720, 480, 320];
  const baseURL = process.env.NEXT_PUBLIC_NETLIFY_URL || process.env.URL;

  return breakpoints.map(breakpoint => {
    const scaledWidth = Math.min(breakpoint, width);
    const scaledHeight = Math.round((height / width) * scaledWidth);
    const path = isAbsolute ? url : `/${url}`;
    return `${baseURL}/.netlify/images?url=${path}&fit=cover&w=${scaledWidth}&h=${scaledHeight} ${scaledWidth}w`;
  }).join(', ');
};

export const generatePhotoLinks = (photo: Photo, srcSet: boolean = false, isAbsolute: boolean = true) => {
  const baseURL = process.env.NEXT_PUBLIC_NETLIFY_URL || process.env.URL;
  const path = isAbsolute ? photo.url : `/${photo.url}`;
  const url = `${baseURL}/.netlify/images?url=${path}&fit=cover`;

  if (!srcSet) return url;

  return {
    src: url,
    srcSet: generateNetlifySrcSet(photo.url, photo.width, photo.height)
  };
};

export const generateBlurhashThumbnailUrl = (photo: Photo, isAbsolute: boolean = true) => {
  const MAX_WIDTH = 150;
  const baseURL = process.env.NEXT_PUBLIC_NETLIFY_URL || process.env.URL;
  const path = isAbsolute ? photo.url : `/${photo.url}`;
  const scaledWidth = Math.min(photo.width, MAX_WIDTH);
  const scaledHeight = Math.round((scaledWidth * MAX_WIDTH) / MAX_WIDTH);

  const blurhashThumbnailUrl = `${baseURL}/.netlify/images?url=${path}&fit=cover&w=${scaledWidth}&h=${scaledHeight}&fm=blurhash`;
  return blurhashThumbnailUrl;
};
