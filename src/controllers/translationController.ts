import { FastifyRequest, FastifyReply } from 'fastify';
import { translationService } from '../services/translationService.js';
import { TranslationRequest, TransliterationRequest, JavaneseDialect } from '../types/index.js';

export const translateController = async (
  request: FastifyRequest<{ Body: TranslationRequest }>,
  reply: FastifyReply
) => {
  const { text, dialect = 'ngoko' } = request.body;

  if (!text) {
    return reply.status(400).send({ error: 'Text is required' });
  }

  try {
    const translatedText = await translationService.translate(text, dialect as JavaneseDialect);
    const script = await translationService.transliterate(translatedText);

    return {
      originalText: text,
      translatedText,
      sourceLang: 'id',
      targetLang: 'jv',
      dialect,
      script
    };
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
};

export const transliterateController = async (
  request: FastifyRequest<{ Body: TransliterationRequest }>,
  reply: FastifyReply
) => {
  const { text } = request.body;

  if (!text) {
    return reply.status(400).send({ error: 'Text is required' });
  }

  try {
    const script = await translationService.transliterate(text);

    return {
      originalText: text,
      script
    };
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
};
