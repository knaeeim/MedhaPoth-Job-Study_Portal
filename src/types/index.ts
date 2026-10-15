export type SubjectId = 'bangla' | 'english' | 'gk_bangladesh' | 'gk_international' | 'math';

export interface SubjectMeta {
  id: SubjectId;
  nameBangla: string;
  nameEnglish: string;
  iconName: string;
  color: string;
  bgLight: string;
  gradient: string;
  description: string;
  totalQuestions: number;
  totalTopics: number;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  examSource: string; // e.g. "৪৫তম বিসিএস প্রিলিমিনারি"
  year: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface ConceptSection {
  title: string;
  summary: string;
  keyPoints: string[];
  formulaOrRule?: string;
  commonTrap?: string;
  example?: {
    q: string;
    a: string;
    note: string;
  };
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface MatchPair {
  id: string;
  term: string;
  match: string;
}

export interface LessonTopic {
  id: string;
  subjectId: SubjectId;
  title: string;
  slug: string;
  badge: string;
  description: string;
  prerequisiteConcepts: ConceptSection[];
  flashcards: Flashcard[];
  matchGameItems: MatchPair[];
  miniQuizQuestionIds: string[];
}

export interface ExamSession {
  id: string;
  title: string;
  subjectId?: SubjectId | 'all';
  questions: Question[];
  timeLimitMinutes: number;
  negativeMarking: number; // e.g. 0.5 per wrong answer
  userAnswers: Record<string, number>; // questionId -> selectedIndex
  markedForReview: Record<string, boolean>;
  isCompleted: boolean;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  completedAt?: string;
}

export interface RevisionItem {
  questionId: string;
  lastReviewed: string;
  nextReviewDate: string;
  timesReviewed: number;
  timesCorrect: number;
  timesWrong: number;
  status: 'learning' | 'reviewing' | 'mastered';
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  avatar: string;
  role: 'candidate' | 'admin';
  targetExam: string;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  isPro: boolean;
  proExpiryDate?: string;
  createdAt: string;
  bookmarkedQuestionIds: string[];
  completedTopicIds: string[];
  revisionDeck: RevisionItem[];
  examHistory: ExamSession[];
}

export interface ExtractedQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subjectId: SubjectId;
  topic: string;
  examSource: string;
  year: number;
  confidence: number;
  tags: string[];
  selected?: boolean;
}

export interface UserProfile extends AuthUser {}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  badge: string;
  rank: number;
  testsTaken: number;
  accuracy: number;
}

