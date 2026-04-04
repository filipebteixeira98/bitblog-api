import { Router } from 'express';

const router = Router();

// biome-ignore lint/correctness/noUnusedFunctionParameters: This is a health check endpoint, so we don't need to use the request parameter.
router.get('/health', (request, response) => {
  response.status(200).json({
    message: 'API is healthy',
    status: 'ok',
    version: '1.0.0',
    docs: '',
    timestamp: new Date().toISOString(),
  });
});

export { router };
