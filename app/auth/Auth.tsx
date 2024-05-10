/* eslint-disable @next/next/no-img-element */
'use client';

import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '#/components/ui/form';
import { useState } from 'react';
import Loader from 'react-ts-loaders';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import { SignInSchema } from '#/lib/validations';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import handleLogin from '#/lib/actions/handleLogin';
import FormInput from '#/components/shared/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import backgroundImage from '#/public/images/background.webp';
import { useRouter, useSearchParams } from 'next/navigation';

const Auth = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const next = searchParams.get('next');
	const redirectUrl = decodeURIComponent(next || '/settings');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		mode: 'all'
	});

	const {
		register,
		trigger,
		formState: { errors }
	} = form;

	const handleSubmit = async (formData: FormData) => {
		const isFormValid = await trigger(undefined, { shouldFocus: true });
		if (!isFormValid) return;

		setIsSubmitting(true);

		const response = await handleLogin(formData);
		if (response && response.error) {
			toast.error(response.error);
			setIsSubmitting(false);
		} else {
			toast.success('Login successful!');

			router.push(redirectUrl);
		}
	};

	return (
		<div className='flex h-svh bg-[#FEFBF6] items-center justify-center'>
        {/* Left Pane  */}
        <div className='hidden lg:flex w-1/2 h-full'>
          <Image
            src={backgroundImage}
            alt='People at an event'
            width={1108}
            height={1200}
            className='w-full h-full object-cover'
            placeholder='blur'
          />
        </div>

        {/* Right Pane */}
        <div className='w-full lg:w-1/2'>
					<div className='flex flex-col justify-center w-full max-w-2xl gap-y-8 p-4 sm:px-6 lg:px-8'>
						<Link href={'/'} className='w-fit'>
							<Image
								src={'/images/logo.png'}
								height={80}
								width={80}
								alt='Event Photos Gallery'
								fetchPriority='high'
							/>
						</Link>
						<h3 className='text-[32px] leading-none lg:text-5xl font-clash-display font-bold'>
							Sign In
						</h3>
						<h2 className='text-[18px] text-[#626D6A] -mt-6'>
							Welcome back! Sign in to manage your event photos.
						</h2>

						<Form {...form}>
							<form className='flex flex-col gap-y-6' action={handleSubmit}>
								{/* Email */}
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className='relative'>
													<label htmlFor={field.name} className='absolute -top-2.5 left-5 inline-block bg-[#FEFBF6] px-1 text-base font-medium text-[#4B483C]'>
														Email Address
													</label>
													<input
														type='text'
														className='block w-full rounded-md border-0 py-2 px-6 h-14 text-gray-900 shadow-sm bg-[#FEFBF6] ring-1 ring-inset ring-gray-300 placeholder:text-[#878477] focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-base'
														placeholder='Enter your email address'
														disabled={isSubmitting}
														id={field.name}
														autoComplete='email'
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage className='text-red-400' />
										</FormItem>
									)}
								/>

								{/* Password */}
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className='relative'>
													<label htmlFor={field.name} className='absolute -top-2.5 left-5 inline-block bg-[#FEFBF6] px-1 text-base font-medium text-[#4B483C]'>
														Password
													</label>
													<input
														type={showPassword ? 'text' : 'password'}
														className='block w-full rounded-md border-0 py-2 px-6 h-14 text-gray-900 shadow-sm bg-[#FEFBF6] ring-1 ring-inset ring-gray-300 placeholder:text-[#878477] focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-base'
														placeholder='Enter your password'
														disabled={isSubmitting}
														id={field.name}
														autoComplete='password'
														{...field}
													/>
													<div onClick={() => setShowPassword(previous => !previous)} className='absolute inset-y-0 right-0 flex text-gray-400 items-center pr-4 cursor-pointer'>
														{showPassword ? <EyeOffIcon className='w-5 h-5' /> : <EyeIcon className='w-6 h-6' />}
													</div>
												</div>
											</FormControl>
											<FormMessage className='text-red-400' />
										</FormItem>
									)}
								/>

								<Button type='submit' disabled={isSubmitting} className='h-12 relative bg-black text-sm xl:text-base'>
									{isSubmitting ? (
										<Loader size={24} className='leading-[0] text-white' />
									) : (
										'Sign In'
									)}
								</Button>
							</form>
						</Form>
					</div>
        </div>

				{/* Old Stuff! */}
				<div className='min-h-full flex-col justify-center px-6 py-12 lg:px-8 hidden'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<Image
							className='mx-auto'
							src={'/images/logo.png'}
							height={84}
							width={84}
							alt='Event Photos Gallery'
							fetchPriority='high'
						/>
						<h2 className='mt-5 text-center text-2xl font-bold font-clash-display text-gray-900'>Sign In</h2>
					</div>

					<div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form action={handleSubmit} className='flex flex-col gap-y-2'>
							{/* Email */}
							<div className='[&>div]:mt-1.5'>
								<FormInput
									label={`Email Address`}
									id='email'
									type='email'
									register={register}
									disabled={isSubmitting}
									placeholder='Enter your email address'
									error={errors.email as { message?: string }}
								/>
							</div>

							{/* Password */}
							<div className='[&>div]:mt-1.5'>
								<FormInput
									label={`Password`}
									id='password'
									type='password'
									register={register}
									disabled={isSubmitting}
									placeholder='Enter your password'
									error={errors.password as { message?: string }}
								/>
							</div>

							<div className='mt-1.5 flex justify-end'>
								<Button type='submit' disabled={isSubmitting} className='overflow-hidden relative w-48 bg-black hover:bg-black'>
									{isSubmitting ? (
										<Loader size={24} className='leading-[0] text-white' />
									) : (
										'Sign In'
									)}
								</Button>
							</div>
						</form>
					</div>
				</div>
      </div>
	);
};

export default Auth;
