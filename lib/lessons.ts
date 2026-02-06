export type BaseLesson = {
  id: string;
  title: string; // shown on the path (English)
  prompt: string; // shown on the path + lesson header (English)
  explain?: string; // shown when correct
  wrongExplain?: string; // shown when wrong (NEW)
  isFinal?: boolean;
};

export type MatchLesson = BaseLesson & {
  type: "match";
  pairs: [string, string][]; // lesson content (French/English vocab)
};

export type McqLesson = BaseLesson & {
  type: "mcq";
  question: string; // lesson content (French)
  choices: string[]; // answers (English)
  answerIndex: number;
};

export type FillLesson = BaseLesson & {
  type: "fill";
  sentence: string; // lesson content (French)
  choices: string[];
  answerIndex: number;
};

export type TranslateLesson = BaseLesson & {
  type: "translate";
  french: string; // lesson content (French)
  acceptable: string[]; // typed answer (English)
  hint?: string;
};

export type Lesson = MatchLesson | McqLesson | FillLesson | TranslateLesson;

export const UNIT = {
  id: "unit-1",
  title: "Love Basics",
  subtitle: "Beginner French mini-lessons",
};

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    type: "match",
    title: "Vocabulary",
    prompt: "Match the words",
    pairs: [
      ["amour", "love"],
      ["cœur", "heart"],
      ["sourire", "smile"],
      ["toujours", "always"],
      ["ensemble", "together"],
    ],
    explain: "Nice! ✅",
    wrongExplain:
      "Almost — one or more pairs are off. Double-check “cœur” and “ensemble”.",
  },
  {
    id: "l2",
    type: "mcq",
    title: "Translations",
    prompt: "Choose the correct translation",
    question: "Je t’aime",
    choices: ["I love you", "I like bread", "I am tired"],
    answerIndex: 0,
    explain: "Classic. 💘",
    wrongExplain: "Not quite — “Je t’aime” means “I love you”.",
  },
  {
    id: "l3",
    type: "fill",
    title: "Sentence",
    prompt: "Complete the sentence",
    sentence: "Je suis très ____ avec toi.",
    choices: ["heureux/heureuse", "perdu(e)", "fâché(e)"],
    answerIndex: 0,
    explain: "Perfect. 😊",
    wrongExplain: "Close — the best fit is “heureux/heureuse”.",
  },
  {
    id: "l4",
    type: "translate",
    title: "Translate",
    prompt: "Translate the phrase",
    french: "Tu es ma personne préférée.",
    acceptable: ["You are my favorite person", "You're my favorite person"],
    hint: "personne préférée = favorite person",
    explain: "Awww 🥹",
    wrongExplain:
      "Almost — “personne préférée” = “favorite person”. Try a simple translation.",
  },
  {
    id: "l5",
    type: "translate",
    title: "Final Level",
    prompt: "Translate the phrase",
    french: "Veux-tu être ma Valentine ?",
    acceptable: ["Will you be my valentine", "Will you be my Valentine"],
    hint: "Veux-tu… = Will you…",
    isFinal: true,
    explain: "Okay… keep going 😌",
    wrongExplain: "Hint: it starts with “Will you…”. You’ve got this 💘",
  },
];
