'use server';

import { logout } from '#/lib/auth';

const handleLogOut = async () => {
	await logout();
};

export default handleLogOut;
