import compression from 'compression';
import cookieParser from 'cookie-parser';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { config } from '@/config';

import { limiter } from '@/lib/express-rate-limit';

import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';

import { router as v1Routes } from '@/routes/v1';

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed by CORS`), false);
    }

    console.log(`CORS request from origin: ${origin}`);
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  compression({
    threshold: 1024,
  }),
);

app.use(helmet());

app.use(limiter);

(async () => {
  try {
    await connectToDatabase();

    app.use('/api/v1', v1Routes);

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);

    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();

    console.log('Shutting down server...');

    process.exit(0);
  } catch (error) {
    console.error('Error during server shutdown:', error);
  }
};

process.on('SIGTERM', handleServerShutdown);

process.on('SIGINT', handleServerShutdown);
