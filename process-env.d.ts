declare namespace NodeJS {
	interface ProcessEnv {
    AUTH_SECRET: string;
    ADMIN_EMAILS: string;
    ADMIN_PASSWORDS: string;
    EVENT_NAME: string;
    [key: string]: string | undefined;
  }
}
