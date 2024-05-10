import { cn } from '#/lib/utils';
import { FC, HTMLAttributes, HTMLInputTypeAttribute } from 'react';

type FormInputProps = {
	label?: string;
	id: string;
	type: HTMLInputTypeAttribute;
	register: any;
	placeholder?: string;
	error: { message?: string };
	hideDefaultLabel?: boolean;
	disabled?: boolean;
	hideErrorMessage?: boolean;
	className?: HTMLAttributes<HTMLDivElement>['className']
}

const FormInput: FC<FormInputProps> = ({
	label,
	id,
	type,
	register,
	placeholder,
	error,
	hideDefaultLabel = false,
	disabled = false,
	hideErrorMessage = false,
	className = ''
}) => (
	<>
		{!hideDefaultLabel && <label htmlFor={id} className='text-sm font-medium leading-6 text-black select-none'>
			{label}
		</label>}
		<div className={cn('mb-2 select-none', className)}>
			<input
				type={type}
				id={id}
				{...register(id, { valueAsNumber: type === 'number' })}
				autoComplete='off'
				disabled={disabled}
				placeholder={placeholder}
				className={cn('form-input', error && error.message && '!border-red-400')}
			/>
			{error?.message && !hideErrorMessage && (
				<p className='mt-2 text-sm text-red-400'>{error.message}</p>
			)}
		</div>
	</>
);

export default FormInput;
