import { JavaneseDialect } from '../entities/translation.js';

/**
 * Represents a single entry in the linguistic dictionary.
 */
export interface DictionaryEntry {
  /** The informal form of the word. */
  ngoko: string;
  /** The formal form of the word. */
  krama: string;
  /** The high-honorific form of the word, if available. */
  kramaInggil?: string;
}

/**
 * Interface for dictionary data access.
 */
export interface IDictionaryRepository {
  /**
   * Looks up a word in the dictionary for a specific dialect.
   * 
   * @param word - The Indonesian word to search for.
   * @param dialect - The target Javanese dialect.
   * @returns A promise that resolves to the translated word or null if not found.
   */
  lookup(word: string, dialect: JavaneseDialect): Promise<string | null>;
}
