import { Word, WordCategory, DifficultyLevel } from '../types/models';

export const sampleWords: Word[] = [
  // Greetings
  {
    id: '1',
    dutch: 'Hallo',
    english: 'Hello',
    category: WordCategory.GREETINGS,
    difficulty: DifficultyLevel.BEGINNER,
    exampleDutch: 'Hallo, hoe gaat het met je?',
    exampleEnglish: 'Hello, how are you?',
  },
  {
    id: '2',
    dutch: 'Goedemorgen',
    english: 'Good morning',
    category: WordCategory.GREETINGS,
    difficulty: DifficultyLevel.BEGINNER,
    exampleDutch: 'Goedemorgen! Heb je goed geslapen?',
    exampleEnglish: 'Good morning! Did you sleep well?',
  },
  {
    id: '3',
    dutch: 'Dank je wel',
    english: 'Thank you',
    category: WordCategory.GREETINGS,
    difficulty: DifficultyLevel.BEGINNER,
    exampleDutch: 'Dank je wel voor je hulp!',
    exampleEnglish: 'Thank you for your help!',
  },
  {
    id: '4',
    dutch: 'Tot ziens',
    english: 'Goodbye',
    category: WordCategory.GREETINGS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Tot ziens! Tot morgen!',
    exampleEnglish: 'Goodbye! See you tomorrow!',
  },
  {
    id: '5',
    dutch: 'Alstublieft',
    english: 'Please / Here you are',
    category: WordCategory.GREETINGS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Mag ik een koffie, alstublieft?',
    exampleEnglish: 'May I have a coffee, please?',
  },

  // Numbers  
  {
    id: '6',
    dutch: 'Een',
    english: 'One',
    category: WordCategory.NUMBERS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik heb een hond.',
    exampleEnglish: 'I have a dog.',
  },
  {
    id: '7',
    dutch: 'Twee',
    english: 'Two',
    category: WordCategory.NUMBERS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik heb twee katten.',
    exampleEnglish: 'I have two cats.',
  },
  {
    id: '8',
    dutch: 'Drie',
    english: 'Three',
    category: WordCategory.NUMBERS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Er zijn drie appels op tafel.',
  },
  {
    id: '9',
    dutch: 'Vier',
    english: 'Four',
    category: WordCategory.NUMBERS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik heb vier vingers op elke hand.',
  },
  {
    id: '10',
    dutch: 'Vijf',
    english: 'Five',
    category: WordCategory.NUMBERS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De winkel sluit om vijf uur.',
  },

  // Colors
  {
    id: '11',
    dutch: 'Rood',
    english: 'Red',
    category: WordCategory.COLORS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De appel is rood.',
  },
  {
    id: '12',
    dutch: 'Blauw',
    english: 'Blue',
    category: WordCategory.COLORS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De lucht is blauw.',
  },
  {
    id: '13',
    dutch: 'Groen',
    english: 'Green',
    category: WordCategory.COLORS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Het gras is groen.',
  },
  {
    id: '14',
    dutch: 'Geel',
    english: 'Yellow',
    category: WordCategory.COLORS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De zon is geel.',
  },
  {
    id: '15',
    dutch: 'Wit',
    english: 'White',
    category: WordCategory.COLORS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De sneeuw is wit.',
  },

  // Food
  {
    id: '16',
    dutch: 'Brood',
    english: 'Bread',
    category: WordCategory.FOOD,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik eet brood met boter.',
  },
  {
    id: '17',
    dutch: 'Kaas',
    english: 'Cheese',
    category: WordCategory.FOOD,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Nederlandse kaas is heerlijk!',
  },
  {
    id: '18',
    dutch: 'Melk',
    english: 'Milk',
    category: WordCategory.FOOD,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik drink melk bij het ontbijt.',
  },
  {
    id: '19',
    dutch: 'Water',
    english: 'Water',
    category: WordCategory.FOOD,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Mag ik een glas water?',
  },
  {
    id: '20',
    dutch: 'Koffie',
    english: 'Coffee',
    category: WordCategory.FOOD,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik drink graag koffie in de ochtend.',
  },

  // Family
  {
    id: '21',
    dutch: 'Moeder',
    english: 'Mother',
    category: WordCategory.FAMILY,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Mijn moeder is lerares.',
  },
  {
    id: '22',
    dutch: 'Vader',
    english: 'Father',
    category: WordCategory.FAMILY,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Mijn vader werkt in een kantoor.',
  },
  {
    id: '23',
    dutch: 'Broer',
    english: 'Brother',
    category: WordCategory.FAMILY,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik heb een oudere broer.',
  },
  {
    id: '24',
    dutch: 'Zus',
    english: 'Sister',
    category: WordCategory.FAMILY,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Mijn zus studeert aan de universiteit.',
  },
  {
    id: '25',
    dutch: 'Kind',
    english: 'Child',
    category: WordCategory.FAMILY,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Het kind speelt in de tuin.',
  },

  // House
  {
    id: '26',
    dutch: 'Huis',
    english: 'House',
    category: WordCategory.HOUSE,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ons huis heeft een grote tuin.',
  },
  {
    id: '27',
    dutch: 'Deur',
    english: 'Door',
    category: WordCategory.HOUSE,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Sluit de deur alstublieft.',
  },
  {
    id: '28',
    dutch: 'Raam',
    english: 'Window',
    category: WordCategory.HOUSE,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Open het raam, het is warm.',
  },
  {
    id: '29',
    dutch: 'Tafel',
    english: 'Table',
    category: WordCategory.HOUSE,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De tafel staat in de woonkamer.',
  },
  {
    id: '30',
    dutch: 'Stoel',
    english: 'Chair',
    category: WordCategory.HOUSE,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ga zitten op een stoel.',
  },

  // Common verbs
  {
    id: '31',
    dutch: 'Zijn',
    english: 'To be',
    category: WordCategory.WORK,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik ben student.',
  },
  {
    id: '32',
    dutch: 'Hebben',
    english: 'To have',
    category: WordCategory.WORK,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik heb een auto.',
  },
  {
    id: '33',
    dutch: 'Gaan',
    english: 'To go',
    category: WordCategory.WORK,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik ga naar school.',
  },
  {
    id: '34',
    dutch: 'Komen',
    english: 'To come',
    category: WordCategory.WORK,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Hij komt morgen.',
  },
  {
    id: '35',
    dutch: 'Maken',
    english: 'To make',
    category: WordCategory.WORK,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Ik maak mijn huiswerk.',
  },

  // Animals
  {
    id: '36',
    dutch: 'Hond',
    english: 'Dog',
    category: WordCategory.ANIMALS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Onze hond heet Max.',
  },
  {
    id: '37',
    dutch: 'Kat',
    english: 'Cat',
    category: WordCategory.ANIMALS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De kat slaapt op de bank.',
  },
  {
    id: '38',
    dutch: 'Vogel',
    english: 'Bird',
    category: WordCategory.ANIMALS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'De vogel zingt in de boom.',
  },
  {
    id: '39',
    dutch: 'Vis',
    english: 'Fish',
    category: WordCategory.ANIMALS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'We eten vis vanavond.',
  },
  {
    id: '40',
    dutch: 'Paard',
    english: 'Horse',
    category: WordCategory.ANIMALS,
    difficulty: DifficultyLevel.BEGINNER,
    
    exampleDutch: 'Het paard rent snel.',
  },
];

// Helper functions
export const getWordsByCategory = (category: WordCategory): Word[] => {
  return sampleWords.filter(word => word.category === category);
};

export const getWordsByDifficulty = (difficulty: DifficultyLevel): Word[] => {
  return sampleWords.filter(word => word.difficulty === difficulty);
};

export const getRandomWords = (count: number): Word[] => {
  const shuffled = [...sampleWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getWordById = (id: string): Word | undefined => {
  return sampleWords.find(word => word.id === id);
};
