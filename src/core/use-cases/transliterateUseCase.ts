// @ts-ignore
import { toJavanese } from 'carakanjs';

export class TransliterateUseCase {
  async execute(text: string): Promise<string> {
    try {
      return toJavanese(text).toString();
    } catch (error) {
      return text;
    }
  }
}
