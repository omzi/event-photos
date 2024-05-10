declare namespace NodeJS {
	interface ProcessEnv {
    ADMIN_EMAILS: string;
    ADMIN_PASSWORDS: string;
    [key: string]: string | undefined;
  }
}
