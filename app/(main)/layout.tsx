import { getSession } from '#/lib/auth';
import NavBar from '#/components/shared/NavBar';
import HeroCard from '#/components/shared/HeroCard';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	const data = await getSession();

	return (
		<main className='flex flex-col w-full bg-white min-h-svh dark:bg-black'>
			<NavBar user={data?.user} />

			<div className='flex-1 w-full p-4 overflow-auto md:px-8'>
				<HeroCard user={data?.user} />

				<section className='mt-8'>
					{children}
				</section>
			</div>
		</main>
	)
}

export default MainLayout;
