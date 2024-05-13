'use client';

import { Photo } from '@prisma/client';
import { useMediaQuery } from 'usehooks-ts';
import ImageHash from '#/components/ImageHash';
import { generatePhotoLinks } from '#/lib/utils';

interface HomeProps {
	photos: Photo[];
}

const Home = ({
	photos
}: HomeProps) => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const MAX_COLUMNS = isMobile ? 2 : 4;
	const getColumns = (colIndex: number) => {
		return photos.filter((_, idx) => idx % MAX_COLUMNS === colIndex);
	}
	const columns = isMobile
		? [getColumns(0), getColumns(1)]
		: [getColumns(0), getColumns(1), getColumns(2), getColumns(3)];
	
	return (
		<div className='flex-1 flex flex-col items-center gap-y-4 bg-gray-100 dark:bg-white/15 rounded-2xl p-5 sm:p-10 mb-4 h-full min-h-96'>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{columns.map(
					(column, idx) => (
						<div key={idx} className='flex flex-col gap-4'>
							{column.map(($, idx) => {
								return (
									<div key={idx} className='relative'>
										<ImageHash
											src={generatePhotoLinks($) as string}
											loading='lazy'
											width={$.width}
											height={$.height}
											alt={$.description}
											blurhash={$.blurhash || undefined}
											className='rounded-lg cursor-pointer w-full h-auto'
										/>
									</div>
								)
							})}
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default Home;
