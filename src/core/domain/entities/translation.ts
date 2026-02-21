/**
 * Supported Javanese dialects for translation.
 */
export type JavaneseDialect = 'ngoko' | 'madya' | 'krama' | 'krama-inggil';

/**
 * Represents a translation result from Indonesian to Javanese.
 */
export interface Translation {
  /** The original input text in Indonesian. */
  originalText: string;
  /** The resulting translated text in Javanese. */
  translatedText: string;
  /** ISO 639-1 code for source language (e.g., 'id'). */
  sourceLang: string;
  /** ISO 639-1 code for target language (e.g., 'jv'). */
  targetLang: string;
  /** The specific dialect used for the translation. */
  dialect: JavaneseDialect;
  /** The Javanese script (Aksara Jawa) representation of the translated text. */
  script?: string;
}
