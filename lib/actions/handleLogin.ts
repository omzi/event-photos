'use server';

import { login } from '#/lib/auth';

const handleLogin = async (formData: FormData) => {
  try {
    await login(formData);
  } catch (error: any) {
    return { error: error.message ?? 'An error occurred while signing you in ;(' };
  }
};

export default handleLogin;
