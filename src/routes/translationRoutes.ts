import { FastifyInstance } from 'fastify';
import { translateController, transliterateController } from '../controllers/translationController.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/translate', translateController);
  fastify.post('/transliterate', transliterateController);
  
  fastify.get('/health', async () => {
    return { status: 'ok', service: 'semar-api' };
  });
}
