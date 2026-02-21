export type JavaneseDialect = 'ngoko' | 'madya' | 'krama' | 'krama-inggil';

export interface Translation {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  dialect: JavaneseDialect;
  script?: string;
}
