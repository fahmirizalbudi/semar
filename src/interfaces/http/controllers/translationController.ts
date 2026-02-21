import { FastifyRequest, FastifyReply } from 'fastify';
import { TranslateUseCase } from '../../../core/use-cases/translateUseCase.js';
import { TransliterateUseCase } from '../../../core/use-cases/transliterateUseCase.js';
import { JavaneseDialect } from '../../../core/domain/entities/translation.js';

export class TranslationController {
  constructor(
    private translateUseCase: TranslateUseCase,
    private transliterateUseCase: TransliterateUseCase
  ) {}

  async translate(
    request: FastifyRequest<{ Body: { text: string; dialect?: string } }>,
    reply: FastifyReply
  ) {
    const { text, dialect = 'ngoko' } = request.body;

    if (!text) {
      return reply.status(400).send({ error: 'Text is required' });
    }

    try {
      const translation = await this.translateUseCase.execute(text, dialect as JavaneseDialect);
      translation.script = await this.transliterateUseCase.execute(translation.translatedText);
      return translation;
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  }

  async transliterate(
    request: FastifyRequest<{ Body: { text: string } }>,
    reply: FastifyReply
  ) {
    const { text } = request.body;

    if (!text) {
      return reply.status(400).send({ error: 'Text is required' });
    }

    try {
      const script = await this.transliterateUseCase.execute(text);
      return { originalText: text, script };
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  }
}
