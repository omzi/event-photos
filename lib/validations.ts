import * as z from 'zod';

export const SearchSchema = z.object({
  documentType: z.string().min(1, 'Please select a document type'),
  documentNumber: z.string().min(1, 'Please enter the document number')
});

export const SignInSchema = z.object({
  email: z.string().min(1, 'Please enter your email address'),
  password: z.string().min(1, 'Please enter your password')
});
