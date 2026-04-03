import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';

import { config } from './config';

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

app.listen(config.PORT, () => {
  console.log(`Server running: http://localhost:${config.PORT}`);
});
