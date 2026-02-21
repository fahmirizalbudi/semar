import { FastifyInstance } from 'fastify';
import { TranslationController } from '../controllers/translationController.js';
import { TranslateUseCase } from '../../../core/use-cases/translateUseCase.js';
import { TransliterateUseCase } from '../../../core/use-cases/transliterateUseCase.js';
import { FileDictionaryRepository } from '../../../infrastructure/persistence/fileDictionaryRepository.js';
import { successResponse } from '../utils/responseWrapper.js';

/**
 * Registers all translation-related routes with the Fastify instance.
 * 
 * @param fastify - The Fastify application instance.
 */
export default async function (fastify: FastifyInstance) {
  const dictionaryRepository = new FileDictionaryRepository();
  const translateUseCase = new TranslateUseCase(dictionaryRepository);
  const transliterateUseCase = new TransliterateUseCase();
  const controller = new TranslationController(translateUseCase, transliterateUseCase);

  fastify.post('/translate', controller.translate.bind(controller));
  fastify.post('/transliterate', controller.transliterate.bind(controller));
  
  /**
   * Simple health check endpoint for monitoring the service.
   */
  fastify.get('/health', async () => {
    return successResponse({ status: 'ok' }, 'Service is healthy');
  });
}
