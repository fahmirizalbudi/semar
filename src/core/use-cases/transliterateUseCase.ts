import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// @ts-ignore
const carakanjs = require('carakanjs');
const { toJavanese } = carakanjs;

/**
 * Use case responsible for transliterating Latin script into Javanese script (Aksara Jawa).
 */
export class TransliterateUseCase {
  /**
   * Converts the input text from Latin letters to Javanese script.
   * 
   * @param text - The Javanese text in Latin format.
   * @returns A promise that resolves to the Javanese script as a string.
   */
  async execute(text: string): Promise<string> {
    try {
      return toJavanese(text).toString();
    } catch (error) {
      return text;
    }
  }
}
