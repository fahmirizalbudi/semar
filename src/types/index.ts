export type JavaneseDialect = 'ngoko' | 'madya' | 'krama' | 'krama-inggil';

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: 'jv';
  dialect?: JavaneseDialect;
}

export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  dialect: JavaneseDialect;
  script?: string; // Aksara Jawa
}

export interface TransliterationRequest {
  text: string;
}

export interface TransliterationResponse {
  originalText: string;
  script: string;
}
