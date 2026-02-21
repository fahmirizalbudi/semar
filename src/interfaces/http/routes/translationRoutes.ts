import { FastifyInstance } from 'fastify';
import { TranslationController } from '../controllers/translationController.js';
import { TranslateUseCase } from '../../../core/use-cases/translateUseCase.js';
import { TransliterateUseCase } from '../../../core/use-cases/transliterateUseCase.js';
import { FileDictionaryRepository } from '../../../infrastructure/persistence/fileDictionaryRepository.js';

export default async function (fastify: FastifyInstance) {
  const dictionaryRepository = new FileDictionaryRepository();
  const translateUseCase = new TranslateUseCase(dictionaryRepository);
  const transliterateUseCase = new TransliterateUseCase();
  const controller = new TranslationController(translateUseCase, transliterateUseCase);

  fastify.post('/translate', controller.translate.bind(controller));
  fastify.post('/transliterate', controller.transliterate.bind(controller));
  
  fastify.get('/health', async () => {
    return { status: 'ok', service: 'semar-api' };
  });
}
