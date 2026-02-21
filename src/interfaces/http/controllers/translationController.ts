import { FastifyRequest, FastifyReply } from 'fastify';
import { TranslateUseCase } from '../../../core/use-cases/translateUseCase.js';
import { TransliterateUseCase } from '../../../core/use-cases/transliterateUseCase.js';
import { JavaneseDialect } from '../../../core/domain/entities/translation.js';
import { successResponse, errorResponse } from '../utils/responseWrapper.js';

/**
 * Controller responsible for handling HTTP requests for the Translation API.
 */
export class TranslationController {
  /**
   * Initializes the controller with necessary use cases.
   * 
   * @param translateUseCase - Injected use case for translation logic.
   * @param transliterateUseCase - Injected use case for transliteration logic.
   */
  constructor(
    private translateUseCase: TranslateUseCase,
    private transliterateUseCase: TransliterateUseCase
  ) {}

  /**
   * Handles POST requests to translate Indonesian text into Javanese.
   * 
   * @param request - Fastify request object with text and dialect in the body.
   * @param reply - Fastify reply object for sending responses.
   * @returns A promise that resolves to a standardized API response.
   */
  async translate(
    request: FastifyRequest<{ Body: { text: string; dialect?: string } }>,
    reply: FastifyReply
  ) {
    const { text, dialect = 'ngoko' } = request.body;

    if (!text) {
      return reply.status(400).send(errorResponse('Text is required', 'BAD_REQUEST'));
    }

    try {
      const translation = await this.translateUseCase.execute(text, dialect as JavaneseDialect);
      translation.script = await this.transliterateUseCase.execute(translation.translatedText);
      return successResponse(translation, 'Translation successful');
    } catch (error) {
      return reply.status(500).send(errorResponse('Internal server error', 'INTERNAL_SERVER_ERROR'));
    }
  }

  /**
   * Handles POST requests to transliterate Javanese text into script.
   * 
   * @param request - Fastify request object with text in the body.
   * @param reply - Fastify reply object for sending responses.
   * @returns A promise that resolves to a standardized API response.
   */
  async transliterate(
    request: FastifyRequest<{ Body: { text: string } }>,
    reply: FastifyReply
  ) {
    const { text } = request.body;

    if (!text) {
      return reply.status(400).send(errorResponse('Text is required', 'BAD_REQUEST'));
    }

    try {
      const script = await this.transliterateUseCase.execute(text);
      return successResponse({ originalText: text, script }, 'Transliteration successful');
    } catch (error) {
      return reply.status(500).send(errorResponse('Internal server error', 'INTERNAL_SERVER_ERROR'));
    }
  }
}
