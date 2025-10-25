/**
 * IndexedDB Database Service
 * 
 * Provides persistent storage for vocabulary words using IndexedDB.
 * Supports offline-first architecture with efficient querying.
 */

import { Word, WordCategory, DifficultyLevel } from '../types/models';

const DB_NAME = 'DutchLingoDB';
const DB_VERSION = 1;
const WORDS_STORE = 'words';

export class DatabaseService {
  private db: IDBDatabase | null = null;

  /**
   * Initialize the database
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Database failed to open');
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('Database initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create words object store
        if (!db.objectStoreNames.contains(WORDS_STORE)) {
          const objectStore = db.createObjectStore(WORDS_STORE, {
            keyPath: 'id',
          });

          // Create indexes for efficient querying
          objectStore.createIndex('category', 'category', { unique: false });
          objectStore.createIndex('difficulty', 'difficulty', { unique: false });
          objectStore.createIndex('dutch', 'dutch', { unique: false });
          objectStore.createIndex('english', 'english', { unique: false });

          console.log('Database structure created');
        }
      };
    });
  }

  /**
   * Add multiple words to the database (bulk insert)
   */
  async addWords(words: Word[]): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readwrite');
      const objectStore = transaction.objectStore(WORDS_STORE);

      let processed = 0;
      const total = words.length;

      transaction.oncomplete = () => {
        console.log(`Successfully added ${processed}/${total} words to database`);
        resolve();
      };

      transaction.onerror = () => {
        console.error('Transaction failed:', transaction.error);
        reject(new Error('Failed to add words to database'));
      };

      words.forEach((word) => {
        const request = objectStore.put(word);
        request.onsuccess = () => {
          processed++;
        };
        request.onerror = () => {
          console.warn(`Failed to add word: ${word.id}`, request.error);
        };
      });
    });
  }

  /**
   * Get all words from the database
   */
  async getAllWords(): Promise<Word[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readonly');
      const objectStore = transaction.objectStore(WORDS_STORE);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result as Word[]);
      };

      request.onerror = () => {
        console.error('Failed to get words:', request.error);
        reject(new Error('Failed to retrieve words from database'));
      };
    });
  }

  /**
   * Get words by category
   */
  async getWordsByCategory(category: WordCategory): Promise<Word[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readonly');
      const objectStore = transaction.objectStore(WORDS_STORE);
      const index = objectStore.index('category');
      const request = index.getAll(category);

      request.onsuccess = () => {
        resolve(request.result as Word[]);
      };

      request.onerror = () => {
        console.error('Failed to get words by category:', request.error);
        reject(new Error('Failed to retrieve words by category'));
      };
    });
  }

  /**
   * Get words by difficulty
   */
  async getWordsByDifficulty(difficulty: DifficultyLevel): Promise<Word[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readonly');
      const objectStore = transaction.objectStore(WORDS_STORE);
      const index = objectStore.index('difficulty');
      const request = index.getAll(difficulty);

      request.onsuccess = () => {
        resolve(request.result as Word[]);
      };

      request.onerror = () => {
        console.error('Failed to get words by difficulty:', request.error);
        reject(new Error('Failed to retrieve words by difficulty'));
      };
    });
  }

  /**
   * Search words by Dutch or English text
   */
  async searchWords(query: string): Promise<Word[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const allWords = await this.getAllWords();
    const lowerQuery = query.toLowerCase();

    return allWords.filter(
      (word) =>
        word.dutch.toLowerCase().includes(lowerQuery) ||
        word.english.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get word by ID
   */
  async getWordById(id: string): Promise<Word | undefined> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readonly');
      const objectStore = transaction.objectStore(WORDS_STORE);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        resolve(request.result as Word | undefined);
      };

      request.onerror = () => {
        console.error('Failed to get word by ID:', request.error);
        reject(new Error('Failed to retrieve word'));
      };
    });
  }

  /**
   * Get random words
   */
  async getRandomWords(count: number): Promise<Word[]> {
    const allWords = await this.getAllWords();
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...allWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }

  /**
   * Get word count
   */
  async getWordCount(): Promise<number> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readonly');
      const objectStore = transaction.objectStore(WORDS_STORE);
      const request = objectStore.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Failed to count words:', request.error);
        reject(new Error('Failed to count words'));
      };
    });
  }

  /**
   * Clear all words from the database
   */
  async clearWords(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([WORDS_STORE], 'readwrite');
      const objectStore = transaction.objectStore(WORDS_STORE);
      const request = objectStore.clear();

      request.onsuccess = () => {
        console.log('All words cleared from database');
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to clear words:', request.error);
        reject(new Error('Failed to clear words'));
      };
    });
  }

  /**
   * Check if database is empty
   */
  async isEmpty(): Promise<boolean> {
    const count = await this.getWordCount();
    return count === 0;
  }

  /**
   * Close the database connection
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('Database connection closed');
    }
  }
}

// Singleton instance
export const database = new DatabaseService();
