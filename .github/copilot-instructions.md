# GitHub Copilot Instructions
## Dutch Vocabulary Learning Application

**Project:** Dutch Vocabulary Learning App  
**Platform:** React Native (Android)  
**Version:** 1.0  
**Last Updated:** October 2025

---

## OVERVIEW

This document provides context and instructions for GitHub Copilot to assist in developing a Dutch vocabulary learning app. The app uses React Native with TypeScript, implements spaced repetition algorithms, and includes gamification features.

---

## 1. PROJECT CONTEXT

### Project Description
A mobile-first vocabulary learning application for Dutch language learners that combines:
- **Spaced Repetition**: Science-backed algorithm for optimal memory retention
- **Gamification**: XP, levels, streaks, achievements, leagues
- **Offline-First**: Core features work without internet
- **Firebase Backend**: Authentication, Firestore, Cloud Functions, Analytics

### Target Users
- English speakers learning Dutch
- Ages 18-45
- Mobile-first users
- Motivated by gamification and progress tracking

---

## 2. TECHNICAL STACK

### Frontend
```
- React Native: 0.73+
- TypeScript: 5.0+
- Redux Toolkit: State management
- React Navigation: 6.x
- React Native Paper: UI components
- React Native Reanimated: Animations (3.x)
- Lottie: Micro-animations
```

### Backend
```
- Firebase Auth: User authentication
- Firestore: User data, progress
- Cloud Functions: SR algorithm, analytics
- Firebase Analytics: User behavior tracking
- FCM: Push notifications
```

### Storage
```
- AsyncStorage: User preferences, tokens
- SQLite: Offline word database (read-only)
- Redux Persist: App state persistence
```

### Key Libraries
```
- react-native-sqlite-storage
- @react-navigation/native
- @react-navigation/stack
- @react-navigation/bottom-tabs
- redux-toolkit
- react-redux
- react-native-paper
- react-native-reanimated
- lottie-react-native
- @react-native-firebase/app
- @react-native-firebase/auth
- @react-native-firebase/firestore
- @react-native-firebase/analytics
```

---

## 3. CODE STYLE & CONVENTIONS

### TypeScript
```typescript
// Use explicit types, avoid 'any'
interface User {
  id: string;
  email: string;
  displayName: string;
  level: number;
  xp: number;
}

// Prefer interfaces over types for objects
interface WordItem {
  id: string;
  dutch: string;
  english: string;
  // ...
}

// Use enums for constants
enum MasteryLevel {
  New = 'new',
  Learning = 'learning',
  Review = 'review',
  Mastered = 'mastered',
}

// Async/await over promises
async function fetchUserData(userId: string): Promise<User> {
  try {
    const doc = await firestore().collection('users').doc(userId).get();
    return doc.data() as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
```

### Naming Conventions
```typescript
// Components: PascalCase
export const HomeScreen = () => { ... };
export const FlashcardComponent = () => { ... };

// Functions: camelCase
const calculateNextReview = (ef: number, interval: number) => { ... };
const handleCardSwipe = () => { ... };

// Constants: UPPER_SNAKE_CASE
const MAX_SESSION_CARDS = 20;
const BASE_INTERVAL_DAYS = 1;

// Files: kebab-case
// home-screen.tsx
// flashcard-component.tsx
// spaced-repetition-utils.ts

// Boolean variables: is/has prefix
const isLoading = true;
const hasCompleted = false;
const canProceed = true;
```

### Component Structure
```typescript
// Functional components with hooks
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  wordId: string;
  onComplete: (result: ReviewResult) => void;
}

export const FlashcardComponent: React.FC<Props> = ({ wordId, onComplete }) => {
  // Hooks at the top
  const dispatch = useDispatch();
  const word = useSelector(state => selectWordById(state, wordId));
  const [isFlipped, setIsFlipped] = useState(false);

  // Effects
  useEffect(() => {
    // Load word data
  }, [wordId]);

  // Event handlers
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (response: 'easy' | 'hard' | 'again') => {
    onComplete({ wordId, response });
  };

  // Render
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

// Styles at the bottom
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### Redux Structure
```typescript
// Use Redux Toolkit slices
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
```

---

## 4. PROJECT STRUCTURE

```
dutch-vocab-app/
├── src/
│   ├── components/           # Reusable components
│   │   ├── common/          # Button, Card, Loading, etc.
│   │   ├── flashcard/       # Flashcard-related components
│   │   ├── gamification/    # XP bar, achievement badge, etc.
│   │   └── navigation/      # Custom navigation components
│   ├── screens/             # Screen components
│   │   ├── auth/           # Login, SignUp, ForgotPassword
│   │   ├── onboarding/     # Welcome, GoalSetting, Assessment
│   │   ├── home/           # HomeScreen
│   │   ├── learning/       # LearningSession, SessionSummary
│   │   ├── stats/          # Statistics, WordBank
│   │   └── profile/        # Profile, Settings, Achievements
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── redux/              # State management
│   │   ├── slices/         # Redux slices
│   │   ├── store.ts        # Store configuration
│   │   └── hooks.ts        # Typed hooks
│   ├── services/           # External services
│   │   ├── firebase/       # Firebase services
│   │   ├── storage/        # AsyncStorage, SQLite
│   │   └── analytics/      # Analytics tracking
│   ├── utils/              # Utility functions
│   │   ├── spaced-repetition.ts
│   │   ├── xp-calculator.ts
│   │   ├── date-utils.ts
│   │   └── validation.ts
│   ├── types/              # TypeScript types
│   │   ├── models.ts       # Data models
│   │   ├── api.ts          # API types
│   │   └── navigation.ts   # Navigation types
│   ├── constants/          # Constants
│   │   ├── colors.ts
│   │   ├── config.ts
│   │   └── achievements.ts
│   ├── hooks/              # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useWordReview.ts
│   │   └── useStreak.ts
│   └── assets/             # Images, fonts, sounds
├── __tests__/              # Test files
├── android/                # Android native code
├── ios/                    # iOS native code (future)
├── .env                    # Environment variables
├── tsconfig.json
├── package.json
└── README.md
```

---

## 5. KEY ALGORITHMS

### 5.1 Spaced Repetition Algorithm

```typescript
/**
 * Calculate next review date using modified SM-2 algorithm
 * 
 * @param wordProgress - Current word progress data
 * @param userResponse - User's response: 'again' | 'hard' | 'easy'
 * @returns Updated word progress with new review date
 */
export const calculateNextReview = (
  wordProgress: WordProgress,
  userResponse: 'again' | 'hard' | 'easy'
): WordProgress => {
  let { easinessFactor, repetitionCount, intervalDays } = wordProgress;
  
  // Quality mapping
  const quality = userResponse === 'again' ? 0 : 
                 userResponse === 'hard' ? 3 : 5;
  
  // Update easiness factor (1.3 - 2.5)
  easinessFactor = Math.max(
    1.3,
    Math.min(
      2.5,
      easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    )
  );
  
  // Reset on "again"
  if (userResponse === 'again') {
    repetitionCount = 0;
    intervalDays = 0.007; // 10 minutes in days
  } else {
    repetitionCount += 1;
    
    // Calculate new interval
    if (repetitionCount === 1) {
      intervalDays = 1;
    } else if (repetitionCount === 2) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easinessFactor);
    }
  }
  
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);
  
  return {
    ...wordProgress,
    easinessFactor,
    repetitionCount,
    intervalDays,
    nextReviewDate,
    lastReviewDate: new Date(),
    totalReviews: wordProgress.totalReviews + 1,
    correctReviews: userResponse !== 'again' 
      ? wordProgress.correctReviews + 1 
      : wordProgress.correctReviews,
  };
};
```

### 5.2 XP & Level Calculation

```typescript
/**
 * Calculate XP required for next level
 * Uses exponential formula: XP = 100 * level^1.5
 */
export const calculateXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(level, 1.5));
};

/**
 * Calculate level from total XP
 */
export const calculateLevelFromXP = (totalXP: number): number => {
  let level = 1;
  let xpRequired = 0;
  
  while (xpRequired <= totalXP) {
    xpRequired += calculateXPForLevel(level);
    if (xpRequired <= totalXP) level++;
  }
  
  return level;
};

/**
 * Calculate XP progress within current level
 */
export const calculateLevelProgress = (totalXP: number): {
  currentLevel: number;
  currentLevelXP: number;
  xpForNextLevel: number;
  progress: number; // 0-1
} => {
  const currentLevel = calculateLevelFromXP(totalXP);
  const xpForCurrentLevel = [...Array(currentLevel - 1)]
    .reduce((sum, _, i) => sum + calculateXPForLevel(i + 1), 0);
  
  const currentLevelXP = totalXP - xpForCurrentLevel;
  const xpForNextLevel = calculateXPForLevel(currentLevel);
  const progress = currentLevelXP / xpForNextLevel;
  
  return {
    currentLevel,
    currentLevelXP,
    xpForNextLevel,
    progress,
  };
};
```

### 5.3 Streak Calculation

```typescript
/**
 * Check and update user streak
 * 
 * @param lastActivityDate - Last time user completed a session
 * @param currentStreak - Current streak count
 * @returns Updated streak data
 */
export const updateStreak = (
  lastActivityDate: Date | null,
  currentStreak: number
): { newStreak: number; isStreakBroken: boolean } => {
  if (!lastActivityDate) {
    return { newStreak: 1, isStreakBroken: false };
  }
  
  const now = new Date();
  const lastActivity = new Date(lastActivityDate);
  
  // Reset times to midnight for day comparison
  now.setHours(0, 0, 0, 0);
  lastActivity.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor(
    (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysDiff === 0) {
    // Same day, no change
    return { newStreak: currentStreak, isStreakBroken: false };
  } else if (daysDiff === 1) {
    // Next day, increment streak
    return { newStreak: currentStreak + 1, isStreakBroken: false };
  } else {
    // Streak broken
    return { newStreak: 1, isStreakBroken: true };
  }
};
```

---

## 6. COMMON PATTERNS

### 6.1 API Calls with Error Handling

```typescript
/**
 * Template for Firebase operations
 */
export const fetchUserProgress = async (userId: string): Promise<WordProgress[]> => {
  try {
    const snapshot = await firestore()
      .collection('wordProgress')
      .where('userId', '==', userId)
      .where('nextReviewDate', '<=', new Date())
      .orderBy('nextReviewDate', 'asc')
      .limit(20)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as WordProgress));
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw new Error('Failed to fetch review queue');
  }
};
```

### 6.2 Offline-First Operations

```typescript
/**
 * Save review with offline support
 */
export const saveReview = async (
  wordProgressId: string,
  updates: Partial<WordProgress>
): Promise<void> => {
  try {
    // Optimistic update to Redux
    dispatch(updateWordProgressLocally({ wordProgressId, updates }));
    
    // Attempt cloud save
    await firestore()
      .collection('wordProgress')
      .doc(wordProgressId)
      .update(updates);
    
    dispatch(markSynced(wordProgressId));
  } catch (error) {
    // Queue for later if offline
    if (!isConnected) {
      dispatch(queueOfflineUpdate({ wordProgressId, updates }));
    } else {
      console.error('Error saving review:', error);
      // Revert optimistic update
      dispatch(revertUpdate(wordProgressId));
    }
  }
};
```

### 6.3 Custom Hooks

```typescript
/**
 * Hook for managing learning session
 */
export const useLearningSession = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [words, setWords] = useState<WordProgress[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadReviewQueue();
  }, [userId]);
  
  const loadReviewQueue = async () => {
    try {
      setIsLoading(true);
      const queue = await fetchUserProgress(userId);
      setWords(queue);
    } catch (error) {
      console.error('Failed to load review queue:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const submitReview = async (response: 'easy' | 'hard' | 'again') => {
    const currentWord = words[currentIndex];
    const updatedProgress = calculateNextReview(currentWord, response);
    
    // Award XP based on response
    const xp = response === 'easy' ? 10 : response === 'hard' ? 5 : 2;
    dispatch(addXP(xp));
    
    // Save review
    await saveReview(currentWord.id, updatedProgress);
    
    // Move to next word
    setCurrentIndex(prev => prev + 1);
  };
  
  const isSessionComplete = currentIndex >= words.length;
  const progress = words.length > 0 ? currentIndex / words.length : 0;
  
  return {
    currentWord: words[currentIndex],
    submitReview,
    isSessionComplete,
    progress,
    isLoading,
    remainingCards: words.length - currentIndex,
  };
};
```

### 6.4 Animations

```typescript
/**
 * Card flip animation using Reanimated
 */
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

export const FlashcardAnimated: React.FC<Props> = ({ word, isFlipped }) => {
  const rotation = useSharedValue(0);
  
  useEffect(() => {
    rotation.value = withTiming(isFlipped ? 180 : 0, { duration: 300 });
  }, [isFlipped]);
  
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });
  
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });
  
  return (
    <View>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <Text style={styles.dutch}>{word.dutch}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <Text style={styles.english}>{word.english}</Text>
      </Animated.View>
    </View>
  );
};
```

---

## 7. TESTING GUIDELINES

### Unit Tests (Jest)
```typescript
describe('Spaced Repetition Algorithm', () => {
  it('should increase interval on easy response', () => {
    const wordProgress: WordProgress = {
      easinessFactor: 2.5,
      repetitionCount: 2,
      intervalDays: 6,
      // ...other fields
    };
    
    const result = calculateNextReview(wordProgress, 'easy');
    
    expect(result.intervalDays).toBeGreaterThan(6);
    expect(result.repetitionCount).toBe(3);
  });
  
  it('should reset on again response', () => {
    const wordProgress: WordProgress = {
      easinessFactor: 2.5,
      repetitionCount: 5,
      intervalDays: 30,
      // ...
    };
    
    const result = calculateNextReview(wordProgress, 'again');
    
    expect(result.repetitionCount).toBe(0);
    expect(result.intervalDays).toBeLessThan(1);
  });
});
```

### Component Tests (React Native Testing Library)
```typescript
import { render, fireEvent } from '@testing-library/react-native';

describe('FlashcardComponent', () => {
  it('should flip card on tap', () => {
    const { getByTestId, getByText } = render(
      <FlashcardComponent word={mockWord} onComplete={jest.fn()} />
    );
    
    const card = getByTestId('flashcard');
    fireEvent.press(card);
    
    expect(getByText(mockWord.english)).toBeTruthy();
  });
});
```

---

## 8. PERFORMANCE OPTIMIZATION

### Best Practices
```typescript
// 1. Memoize expensive calculations
const wordStats = useMemo(() => {
  return calculateWordStatistics(words);
}, [words]);

// 2. Optimize re-renders with React.memo
export const WordCard = React.memo<Props>(({ word }) => {
  return <View>...</View>;
}, (prevProps, nextProps) => {
  return prevProps.word.id === nextProps.word.id;
});

// 3. Use FlatList for long lists
<FlatList
  data={words}
  renderItem={({ item }) => <WordCard word={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// 4. Lazy load images
<FastImage
  source={{ uri: word.imageUrl }}
  resizeMode="cover"
  style={styles.image}
/>

// 5. Debounce search inputs
const debouncedSearch = useMemo(
  () => debounce((text: string) => {
    dispatch(searchWords(text));
  }, 300),
  []
);
```

---

## 9. FIREBASE INTEGRATION

### Authentication
```typescript
import auth from '@react-native-firebase/auth';

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use');
    }
    throw error;
  }
};

export const signInWithGoogle = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};
```

### Firestore Operations
```typescript
import firestore from '@react-native-firebase/firestore';

// Real-time listener for user data
export const subscribeToUser = (
  userId: string,
  callback: (user: User) => void
) => {
  return firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(snapshot => {
      if (snapshot.exists) {
        callback(snapshot.data() as User);
      }
    });
};

// Batch write for multiple updates
export const batchUpdateProgress = async (
  updates: Array<{ id: string; data: Partial<WordProgress> }>
) => {
  const batch = firestore().batch();
  
  updates.forEach(({ id, data }) => {
    const ref = firestore().collection('wordProgress').doc(id);
    batch.update(ref, data);
  });
  
  await batch.commit();
};
```

---

## 10. DEBUGGING TIPS

### React Native Debugger
```typescript
// Use console.log sparingly in production
if (__DEV__) {
  console.log('User data:', userData);
}

// Use Reactotron for better debugging
import Reactotron from 'reactotron-react-native';

Reactotron.log('Session started');
Reactotron.display({
  name: 'Word Review',
  value: { wordId, response, xpGained },
});
```

### Performance Monitoring
```typescript
import perf from '@react-native-firebase/perf';

const trace = await perf().startTrace('learning_session');
trace.putAttribute('word_count', sessionWords.length.toString());

// ... perform session logic

await trace.stop();
```

---

## 11. COPILOT-SPECIFIC INSTRUCTIONS

### When Writing Components
- Always use TypeScript with explicit types
- Include proper error handling
- Add accessibility props (accessibilityLabel, accessibilityHint)
- Use StyleSheet.create for styles
- Include loading and error states
- Add comments for complex logic

### When Writing Algorithms
- Include JSDoc comments with examples
- Add input validation
- Handle edge cases
- Include unit test suggestions
- Optimize for performance (O(n) complexity notes)

### When Writing Redux Code
- Use Redux Toolkit (createSlice, createAsyncThunk)
- Type all actions and state
- Include proper error handling in thunks
- Add loading states

### When Writing Tests
- Use descriptive test names
- Include happy path and error cases
- Mock external dependencies (Firebase, AsyncStorage)
- Aim for 80%+ coverage on critical paths

### When Writing Utilities
- Pure functions when possible
- No side effects
- Comprehensive input validation
- Clear return types

---

## 12. COMMON ISSUES & SOLUTIONS

### Issue: "Cannot read property 'map' of undefined"
**Solution**: Always check if data exists before mapping
```typescript
const wordList = words?.map(word => ...) || [];
```

### Issue: Firebase persistence conflicts
**Solution**: Disable persistence in dev mode if needed
```typescript
if (__DEV__) {
  await firestore().settings({ persistence: false });
}
```

### Issue: Animated values not updating
**Solution**: Ensure you're using useSharedValue, not useState
```typescript
const opacity = useSharedValue(1); // ✅ Correct
const opacity = useState(1); // ❌ Won't work with Reanimated
```

---

## 13. ENVIRONMENT VARIABLES

```bash
# .env file structure
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Use in code
import Config from 'react-native-config';
const apiKey = Config.FIREBASE_API_KEY;
```

---

## 14. DEPLOYMENT CHECKLIST

### Before Release
- [ ] Remove all console.logs
- [ ] Enable ProGuard (Android)
- [ ] Test on low-end devices
- [ ] Test offline mode thoroughly
- [ ] Verify analytics tracking
- [ ] Check memory leaks
- [ ] Validate all forms
- [ ] Test push notifications
- [ ] Review accessibility
- [ ] Update version numbers

---

**Remember**: This app prioritizes user experience, scientific accuracy, and performance. Every feature should serve the goal of effective vocabulary learning!