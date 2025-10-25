// Word and vocabulary-related types

export interface Word {
  id: string;
  dutch: string;
  english: string;
  category: WordCategory;
  difficulty: DifficultyLevel;
  exampleDutch?: string;
  exampleEnglish?: string;
  pronunciation?: string;
  imageUrl?: string;
  audioUrl?: string;
  notes?: string; // For plural forms, conjugations, etc.
}

export enum WordCategory {
  GREETINGS = 'greetings',
  NUMBERS = 'numbers',
  COLORS = 'colors',
  FOOD = 'food',
  FAMILY = 'family',
  HOUSE = 'house',
  BODY = 'body',
  CLOTHES = 'clothes',
  WEATHER = 'weather',
  TIME = 'time',
  ANIMALS = 'animals',
  NATURE = 'nature',
  TRANSPORT = 'transport',
  WORK = 'work',
  SCHOOL = 'school',
  SHOPPING = 'shopping',
  HEALTH = 'health',
  SPORTS = 'sports',
  HOBBIES = 'hobbies',
  EMOTIONS = 'emotions',
  VERBS = 'verbs',
  COMMON = 'common',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

// User progress for each word
export interface WordProgress {
  id: string;
  userId: string;
  wordId: string;
  masteryLevel: MasteryLevel;
  easinessFactor: number; // SM-2 algorithm
  repetitionCount: number;
  intervalDays: number;
  nextReviewDate: Date;
  lastReviewDate: Date;
  totalReviews: number;
  correctReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum MasteryLevel {
  NEW = 'new',
  LEARNING = 'learning',
  REVIEW = 'review',
  MASTERED = 'mastered',
}

// Learning session
export interface LearningSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  wordsReviewed: number;
  correctAnswers: number;
  xpEarned: number;
  completed: boolean;
}

// Review result for a single word
export interface ReviewResult {
  wordId: string;
  response: ReviewResponse;
  timeSpent: number; // milliseconds
  timestamp: Date;
}

export enum ReviewResponse {
  AGAIN = 'again', // Didn't remember
  HARD = 'hard',   // Remembered with difficulty
  GOOD = 'good',   // Remembered correctly
  EASY = 'easy',   // Remembered very easily
}

// Statistics
export interface UserStats {
  userId: string;
  totalWords: number;
  masteredWords: number;
  learningWords: number;
  reviewWords: number;
  newWords: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  studyTimeMinutes: number;
  lastStudyDate: Date;
}

// Achievement
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  category: AchievementCategory;
}

export enum AchievementCategory {
  WORDS_LEARNED = 'words_learned',
  STREAK = 'streak',
  PERFECT_SESSIONS = 'perfect_sessions',
  CATEGORY_MASTER = 'category_master',
  SPEED = 'speed',
  DEDICATION = 'dedication',
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress: number;
}
