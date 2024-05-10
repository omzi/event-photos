import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);
const adminEmails = process.env.ADMIN_EMAILS.split(', ');
const adminPasswords = process.env.ADMIN_PASSWORDS.split(', ');

export const users = adminEmails.map((email, idx) => ({
  email,
  password: adminPasswords[idx],
}));

export interface Payload {
	user: { email: string; password: string };
	expires: Date;
};

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
};

export const decrypt = async (input: string): Promise<Payload> => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  });

  return payload as unknown as Payload;
};

export const login = async (formData: FormData) => {
  // Verify credentials && get the user
  const user = { email: formData.get('email'), password: formData.get('password') };
	const validUser = users.find($ => $.email === `${user.email}`.toLowerCase() && $.password === user.password);

	if (!validUser) {
		throw new Error('Invalid credentials');
	}

  // Create the session
  const expires = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 days
  const session = await encrypt({ user: validUser, expires });

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true });
};

export const logout = async () => {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
};

export const getSession = async () => {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
};
