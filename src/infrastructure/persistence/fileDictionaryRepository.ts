import fs from 'fs';
import path from 'path';
import { IDictionaryRepository, DictionaryEntry } from '../../core/domain/repositories/dictionaryRepository.js';
import { JavaneseDialect } from '../../core/domain/entities/translation.js';

export class FileDictionaryRepository implements IDictionaryRepository {
  private csvDict: { [key: string]: string } = {};
  private manualDict: { [key: string]: DictionaryEntry } = {
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

  constructor() {
    this.loadDictionary();
  }

  private loadDictionary() {
    try {
      const dictPath = path.join(process.cwd(), 'src/data/dictionary.json');
      if (fs.existsSync(dictPath)) {
        const data = fs.readFileSync(dictPath, 'utf8');
        this.csvDict = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading dictionary:', error);
    }
  }

  async lookup(word: string, dialect: JavaneseDialect): Promise<string | null> {
    const manualEntry = this.manualDict[word];
    if (manualEntry) {
      if (dialect === 'ngoko') return manualEntry.ngoko;
      if (dialect === 'krama-inggil' && manualEntry.kramaInggil) return manualEntry.kramaInggil;
      return manualEntry.krama;
    }

    const csvEntry = this.csvDict[word];
    if (csvEntry) {
      return csvEntry.split(';')[0].replace(/^\d+\s*/, '').trim();
    }

    return null;
  }
}
