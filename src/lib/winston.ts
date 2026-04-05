import winston from 'winston';

import { config } from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

const transports: winston.transport[] = [];

if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        align(),
        printf(({ timestamp, level, message, ...metadata }) => {
          const metadataString = Object.keys(metadata).length
            ? `\n${JSON.stringify(metadata)}`
            : '';

          return `${timestamp} [${level.toUpperCase()}]: ${message}${metadataString}`;
        }),
      ),
    }),
  );
}

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.NODE_ENV === 'test',
});

export { logger };
