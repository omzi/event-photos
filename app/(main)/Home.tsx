'use client';

import { useState } from 'react';
import { Photo } from '@prisma/client';
import Image from 'next/image';

interface HomeProps {
	photos: Photo[];
}

const MAX_COLUMNS = 4;

const Home = ({
	photos
}: HomeProps) => {
	const getColumns = (colIndex: number) => {
		return photos.filter((_, idx) => idx % MAX_COLUMNS === colIndex);
	}
	
	return (
		<div className='flex flex-col items-center gap-y-4 bg-gray-100 dark:bg-white/15 rounded-2xl p-5 sm:p-10 mb-4'>
			<div className='grid grid-cols-4 gap-4'>
				{[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
					(column, idx) => (
						<div key={idx} className='flex flex-col gap-4'>
							{column.map(($, idx) => (
								<div key={idx} className='relative'>
									<Image
										src={$.url}
										width={$.width}
										height={$.height}
										alt={$.description}
										blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
										className='rounded-lg cursor-pointer'
									/>
								</div>
							))}
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default Home;
