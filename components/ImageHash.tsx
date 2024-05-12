import Image from 'next/image';
import { useMemo } from 'react';
import { blurHashToDataURL } from '#/lib/blurhashDataURL';

const ImageHash = ({
	blurhash,
	...props
}: React.ComponentProps<typeof Image> & { blurhash?: string }) => {
	const base64BlurHash = useMemo(() => {
		if (blurhash) {
			return blurHashToDataURL(blurhash);
		}

		return null;
	}, [blurhash]);

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			placeholder='blur'
			blurDataURL={base64BlurHash || undefined}
			{...props}
		/>
	);
};

export default ImageHash;
