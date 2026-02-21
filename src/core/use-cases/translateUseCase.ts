import { IDictionaryRepository } from '../domain/repositories/dictionaryRepository.js';
import { JavaneseDialect, Translation } from '../domain/entities/translation.js';

/**
 * Use case responsible for translating Indonesian text into Javanese.
 */
export class TranslateUseCase {
  /**
   * Initializes the use case with a dictionary repository.
   * 
   * @param dictionaryRepository - The data source for word lookups.
   */
  constructor(private dictionaryRepository: IDictionaryRepository) {}

  /**
   * Executes the translation process.
   * 
   * @param text - The Indonesian text to translate.
   * @param dialect - The target Javanese dialect (e.g., 'ngoko', 'krama').
   * @returns A promise that resolves to a {@link Translation} entity.
   */
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
