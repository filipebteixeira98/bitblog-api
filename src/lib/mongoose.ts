import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';

import { config } from '@/config';

const clientOptions: ConnectOptions = {
  dbName: 'bitblog',
  appName: 'BitBlog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    console.log('Connected to MongoDB successfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.log('An unknown error occurred while connecting to MongoDB');
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();

    console.log('Disconnected from MongoDB successfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    console.log(
      'An unknown error occurred while disconnecting from MongoDB',
      error,
    );
  }
};
