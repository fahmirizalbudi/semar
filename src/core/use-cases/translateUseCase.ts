import { IDictionaryRepository } from '../domain/repositories/dictionaryRepository.js';
import { JavaneseDialect, Translation } from '../domain/entities/translation.js';

export class TranslateUseCase {
  constructor(private dictionaryRepository: IDictionaryRepository) {}

  async execute(text: string, dialect: JavaneseDialect = 'ngoko'): Promise<Translation> {
    const words = text.toLowerCase().split(/\s+/);
    const translatedWords = await Promise.all(
      words.map(async (word) => {
        const translated = await this.dictionaryRepository.lookup(word, dialect);
        return translated || word;
      })
    );

    return {
      originalText: text,
      translatedText: translatedWords.join(' '),
      sourceLang: 'id',
      targetLang: 'jv',
      dialect: dialect
    };
  }
}
