import dotenv from 'dotenv';
import type ms from 'ms';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: [''],
  MONGO_URI: process.env.MONGO_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  // biome-ignore lint/style/noNonNullAssertion: We are sure that these environment variables will be set, otherwise the application cannot run.
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  // biome-ignore lint/style/noNonNullAssertion: The application depends on these environment variables; without them, it will fail to initialize.
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
};

export { config };
