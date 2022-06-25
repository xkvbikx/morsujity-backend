export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "development" | "production";
            SERVER_PORT: string;
            DEV_FRONT_URL_ADDRESS: string;
            PRO_FRONT_URL_ADDRESS: string;
            DEV_WHITELISTED_DOMAINS: string;
            PRO_WHITELISTED_DOMAINS: string;
            DEV_MONGO_PATH: string;
            PRO_MONGO_USER: string;
            PRO_MONGO_PASSWORD: string;
            PRO_MONGO_PATH: string;
            JWT_SECRET: string;
            SERVER_HOST: string;
            SERVER_MAIL_PORT: string;
            SERVER_MAIL_USER: string;
            SERVER_MAIL_PASS: string;
            DEV_ACCOUNT_EXPIRE_AFTER: string;
            PRO_ACCOUNT_EXPIRE_AFTER: string;
        }
    }
}
