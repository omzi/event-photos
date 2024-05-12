import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateDefaultAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${seed}`;
};

export const protectedRoutes = ['/upload', '/settings', '/api/photos/save', '/api/settings/save'];

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
