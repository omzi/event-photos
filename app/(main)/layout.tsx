import { getSession } from '#/lib/auth';
import NavBar from '#/components/shared/NavBar';
import HeroCard from '#/components/shared/HeroCard';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	const data = await getSession();

	return (
		<main className='flex min-h-svh w-full flex-col bg-white dark:bg-black'>
			<NavBar user={data?.user} />

			<div className='flex-1 overflow-auto p-4 md:px-8 w-full'>
				<HeroCard user={data?.user} />

				<section className='sm:mt-12'>
					{children}
				</section>
			</div>
		</main>
	)
}

export default MainLayout;
