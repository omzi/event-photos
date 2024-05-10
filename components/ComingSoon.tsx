import Image from 'next/image';

const ComingSoon = () => {
	return (
		<div className='min-h-[50vh] flex flex-col items-center justify-center gap-y-4'>
			<Image
				src='/images/rocket.png'
				width={96}
				height={96}
				alt='Coming soon'
			/>
			<h2 className='text-4xl font-medium font-clash-display text-center'>Launching Soon!</h2>
		</div>
	)
}

export default ComingSoon;
