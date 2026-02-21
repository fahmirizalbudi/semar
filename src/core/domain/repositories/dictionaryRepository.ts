import { JavaneseDialect } from '../entities/translation.js';

export interface DictionaryEntry {
  ngoko: string;
  krama: string;
  kramaInggil?: string;
}

export interface IDictionaryRepository {
  lookup(word: string, dialect: JavaneseDialect): Promise<string | null>;
}
