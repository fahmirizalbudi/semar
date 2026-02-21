import { JavaneseDialect } from '../types/index.js';
// @ts-ignore
import { toJavanese } from 'carakanjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DictionaryEntry {
  ngoko: string;
  krama: string;
  kramaInggil?: string;
}

const manualDict: { [key: string]: DictionaryEntry } = {
  "saya": { ngoko: "aku", krama: "kula" },
  "kamu": { ngoko: "kowe", krama: "panjenengan" },
  "makan": { ngoko: "mangan", krama: "nedha", kramaInggil: "dhahar" },
  "minum": { ngoko: "ngombe", krama: "ngunjuk" },
  "pergi": { ngoko: "lunga", krama: "kesah", kramaInggil: "tindak" },
  "datang": { ngoko: "teka", krama: "dhateng", kramaInggil: "rawuh" },
  "apa": { ngoko: "apa", krama: "punapa" },
  "di mana": { ngoko: "ing ngendi", krama: "wonten pundi" },
  "kapan": { ngoko: "kapan", krama: "benjang punapa" },
  "siapa": { ngoko: "sapa", krama: "sinten" },
  "bagaimana": { ngoko: "kepiye", krama: "kadospundi" },
  "mengapa": { ngoko: "ngapa", krama: "kena punapa" },
  "ini": { ngoko: "iki", krama: "punika" },
  "itu": { ngoko: "kuwi", krama: "punika" },
  "bagus": { ngoko: "apik", krama: "sae" },
  "terima kasih": { ngoko: "matur nuwun", krama: "matur sembah nuwun" },
  "maaf": { ngoko: "ngapura", krama: "ngapunten" },
  "ya": { ngoko: "iya", krama: "inggih" },
  "tidak": { ngoko: "ora", krama: "mboten" },
  "halo": { ngoko: "halo", krama: "sugeng" }
};

export class TranslationService {
  private csvDict: { [key: string]: string } = {};

  constructor() {
    this.loadDictionary();
  }

  private loadDictionary() {
    try {
      const dictPath = path.join(process.cwd(), 'src/data/dictionary.json');
      if (fs.existsSync(dictPath)) {
        const data = fs.readFileSync(dictPath, 'utf8');
        this.csvDict = JSON.parse(data);
        console.log('Loaded CSV dictionary with', Object.keys(this.csvDict).length, 'entries');
      } else {
        console.warn('Dictionary not found at', dictPath);
      }
    } catch (error) {
      console.error('Error loading dictionary:', error);
    }
  }

  async translate(text: string, dialect: JavaneseDialect = 'ngoko'): Promise<string> {
    const words = text.toLowerCase().split(/\s+/);
    const translatedWords = words.map(word => {
      // 1. Check manual dictionary first (better for dialects)
      const manualEntry = manualDict[word];
      if (manualEntry) {
        if (dialect === 'ngoko') return manualEntry.ngoko;
        if (dialect === 'krama-inggil' && manualEntry.kramaInggil) return manualEntry.kramaInggil;
        return manualEntry.krama;
      }

      // 2. Check CSV dictionary
      const csvEntry = this.csvDict[word];
      if (csvEntry) {
        // Clean up definitions (often like "1 meaning; 2 meaning")
        // For a simple translator, we'll take the first one and remove numbering
        const firstMeaning = csvEntry.split(';')[0].replace(/^\d+\s*/, '').trim();
        return firstMeaning;
      }

      return word; // Fallback to original word
    });
    
    return translatedWords.join(' ');
  }

  async transliterate(text: string): Promise<string> {
    try {
      return toJavanese(text).toString();
    } catch (error) {
      console.error('Transliteration error:', error);
      return text;
    }
  }
}

export const translationService = new TranslationService();
