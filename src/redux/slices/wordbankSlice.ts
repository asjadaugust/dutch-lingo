/**
 * Wordbank Redux Slice
 * 
 * Manages the vocabulary wordbank state including:
 * - Loading words from wordlist
 * - Storing words in IndexedDB
 * - Querying and filtering words
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Word, WordCategory, DifficultyLevel } from '../../types/models';
import { database } from '../../services/database';
import { loadWordlistFromFile } from '../../utils/wordlist-parser';

interface WordbankState {
  words: Word[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  totalWords: number;
  filters: {
    category?: WordCategory;
    difficulty?: DifficultyLevel;
    searchQuery?: string;
  };
}

const initialState: WordbankState = {
  words: [],
  isLoading: false,
  isInitialized: false,
  error: null,
  totalWords: 0,
  filters: {},
};

/**
 * Initialize the wordbank
 * - Checks if database is empty
 * - Loads wordlist if needed
 * - Populates IndexedDB
 */
export const initializeWordbank = createAsyncThunk(
  'wordbank/initialize',
  async (_, { rejectWithValue }) => {
    try {
      // Initialize database
      await database.init();

      // Check if database already has words
      const isEmpty = await database.isEmpty();

      if (isEmpty) {
        console.log('Database is empty, loading wordlist...');

        // Load wordlist from file
        const words = await loadWordlistFromFile('/docs/wordlist.md');
        console.log(`Parsed ${words.length} words from wordlist`);

        // Store in IndexedDB
        await database.addWords(words);
        console.log('Words stored in database');

        return { words, totalWords: words.length };
      } else {
        console.log('Database already populated, loading words...');
        const words = await database.getAllWords();
        return { words, totalWords: words.length };
      }
    } catch (error) {
      console.error('Failed to initialize wordbank:', error);
      return rejectWithValue('Failed to load vocabulary');
    }
  }
);

/**
 * Load all words from database
 */
export const loadAllWords = createAsyncThunk(
  'wordbank/loadAll',
  async (_, { rejectWithValue }) => {
    try {
      const words = await database.getAllWords();
      return words;
    } catch (error) {
      console.error('Failed to load words:', error);
      return rejectWithValue('Failed to load words');
    }
  }
);

/**
 * Filter words by category
 */
export const filterByCategory = createAsyncThunk(
  'wordbank/filterByCategory',
  async (category: WordCategory, { rejectWithValue }) => {
    try {
      const words = await database.getWordsByCategory(category);
      return { words, category };
    } catch (error) {
      console.error('Failed to filter by category:', error);
      return rejectWithValue('Failed to filter words');
    }
  }
);

/**
 * Filter words by difficulty
 */
export const filterByDifficulty = createAsyncThunk(
  'wordbank/filterByDifficulty',
  async (difficulty: DifficultyLevel, { rejectWithValue }) => {
    try {
      const words = await database.getWordsByDifficulty(difficulty);
      return { words, difficulty };
    } catch (error) {
      console.error('Failed to filter by difficulty:', error);
      return rejectWithValue('Failed to filter words');
    }
  }
);

/**
 * Search words
 */
export const searchWords = createAsyncThunk(
  'wordbank/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const words = await database.searchWords(query);
      return { words, query };
    } catch (error) {
      console.error('Failed to search words:', error);
      return rejectWithValue('Failed to search words');
    }
  }
);

/**
 * Get random words for learning session
 */
export const getRandomWords = createAsyncThunk(
  'wordbank/getRandom',
  async (count: number, { rejectWithValue }) => {
    try {
      const words = await database.getRandomWords(count);
      return words;
    } catch (error) {
      console.error('Failed to get random words:', error);
      return rejectWithValue('Failed to get random words');
    }
  }
);

/**
 * Reload wordlist (force refresh)
 */
export const reloadWordlist = createAsyncThunk(
  'wordbank/reload',
  async (_, { rejectWithValue }) => {
    try {
      // Clear existing words
      await database.clearWords();

      // Load fresh wordlist
      const words = await loadWordlistFromFile('/docs/wordlist.md');

      // Store in database
      await database.addWords(words);

      return { words, totalWords: words.length };
    } catch (error) {
      console.error('Failed to reload wordlist:', error);
      return rejectWithValue('Failed to reload vocabulary');
    }
  }
);

const wordbankSlice = createSlice({
  name: 'wordbank',
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.filters = {};
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Initialize wordbank
    builder
      .addCase(initializeWordbank.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeWordbank.fulfilled, (state, action) => {
        state.words = action.payload.words;
        state.totalWords = action.payload.totalWords;
        state.isLoading = false;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(initializeWordbank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Load all words
    builder
      .addCase(loadAllWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAllWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.isLoading = false;
        state.filters = {};
      })
      .addCase(loadAllWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Filter by category
    builder
      .addCase(filterByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterByCategory.fulfilled, (state, action) => {
        state.words = action.payload.words;
        state.filters.category = action.payload.category;
        state.isLoading = false;
      })
      .addCase(filterByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Filter by difficulty
    builder
      .addCase(filterByDifficulty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterByDifficulty.fulfilled, (state, action) => {
        state.words = action.payload.words;
        state.filters.difficulty = action.payload.difficulty;
        state.isLoading = false;
      })
      .addCase(filterByDifficulty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Search words
    builder
      .addCase(searchWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchWords.fulfilled, (state, action) => {
        state.words = action.payload.words;
        state.filters.searchQuery = action.payload.query;
        state.isLoading = false;
      })
      .addCase(searchWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get random words
    builder
      .addCase(getRandomWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRandomWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.isLoading = false;
      })
      .addCase(getRandomWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reload wordlist
    builder
      .addCase(reloadWordlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reloadWordlist.fulfilled, (state, action) => {
        state.words = action.payload.words;
        state.totalWords = action.payload.totalWords;
        state.isLoading = false;
        state.filters = {};
      })
      .addCase(reloadWordlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFilters, setSearchQuery } = wordbankSlice.actions;
export default wordbankSlice.reducer;
