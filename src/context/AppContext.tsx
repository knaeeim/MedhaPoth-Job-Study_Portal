'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Question, ExamSession, RevisionItem, AuthUser, UserProfile, SubjectId } from '@/types';
import { INITIAL_QUESTIONS } from '@/data/mockQuestions';
import { INITIAL_USERS } from '@/data/mockUsers';

interface ExamConfig {
  title?: string;
  subjectId?: SubjectId | 'all';
  count: number;
  timeMinutes: number;
  negativeMarking: number;
}

interface AppContextType {
  // Navigation & View State
  activeView: string;
  setActiveView: (view: string) => void;

  // Candidate Authentication
  currentUser: AuthUser | null;
  user: UserProfile; // Aliased for seamless component compatibility
  usersList: AuthUser[];
  loginCandidate: (emailOrPhone: string, password: string) => { success: boolean; message?: string };
  registerCandidate: (data: { name: string; email: string; phone?: string; password: string; targetExam: string }) => { success: boolean; message?: string };
  logoutCandidate: () => void;

  // Super Admin Authentication & Controls
  isSuperAdminLoggedIn: boolean;
  superAdminLogin: (adminId: string, password: string) => { success: boolean; message?: string };
  superAdminLogout: () => void;
  adminToggleUserPro: (userId: string) => void;
  adminDeleteUser: (userId: string) => void;
  adminAddExtractedQuestions: (questions: Omit<Question, 'id'>[]) => number;

  // Gamification & User Actions
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  toggleBookmark: (questionId: string) => void;
  markTopicCompleted: (topicId: string) => void;
  togglePro: (status?: boolean) => void;
  
  // Questions Bank
  questions: Question[];
  addQuestion: (q: Omit<Question, 'id'>) => void;
  updateQuestion: (id: string, q: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  resetQuestions: () => void;

  // Spaced Repetition / Revision
  recordQuestionResult: (questionId: string, isCorrect: boolean) => void;
  getDueRevisionQuestions: () => Question[];

  // Exam
  activeExam: ExamSession | null;
  startRandomExam: (config: ExamConfig) => void;
  startSetExam: (questions: Question[], title: string, durationMinutes: number) => void;
  submitAnswer: (questionId: string, optionIndex: number) => void;
  toggleMarkForReview: (questionId: string) => void;
  finishExam: () => ExamSession | null;
  cancelExam: () => void;
  
  // Sound
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveViewState] = useState<string>('home');
  const [usersList, setUsersList] = useState<AuthUser[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<AuthUser>(INITIAL_USERS[7]); // Default logged-in candidate
  const [isSuperAdminLoggedIn, setIsSuperAdminLoggedIn] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [activeExam, setActiveExam] = useState<ExamSession | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedUsersList = localStorage.getItem('medhapath_users_list');
      if (savedUsersList) {
        setUsersList(JSON.parse(savedUsersList));
      }
      const savedCurrentUser = localStorage.getItem('medhapath_current_user');
      if (savedCurrentUser) {
        setCurrentUser(JSON.parse(savedCurrentUser));
      }
      const savedAdminSession = localStorage.getItem('medhapath_admin_session');
      if (savedAdminSession === 'true') {
        setIsSuperAdminLoggedIn(true);
      }
      const savedQuestions = localStorage.getItem('medhapath_questions');
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
    } catch {
      // ignore parsing errors
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('medhapath_users_list', JSON.stringify(usersList));
    } catch {
      // ignore
    }
  }, [usersList, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('medhapath_current_user', JSON.stringify(currentUser));
    } catch {
      // ignore
    }
  }, [currentUser, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('medhapath_questions', JSON.stringify(questions));
    } catch {
      // ignore
    }
  }, [questions, isHydrated]);

  // Unified navigation helper that cancels any blocked active exam
  const setActiveView = (view: string) => {
    if (activeExam) {
      setActiveExam(null); // Clear exam runner so the clicked view displays immediately
    }
    setActiveViewState(view);
  };

  // Candidate Authentication
  const loginCandidate = (emailOrPhone: string, password: string): { success: boolean; message?: string } => {
    const trimmedInput = emailOrPhone.trim().toLowerCase();
    const existing = usersList.find(
      u => u.email.toLowerCase() === trimmedInput || (u.phone && u.phone === trimmedInput)
    );

    if (!existing) {
      // Allow seamless test login with entered email
      const newCandidate: AuthUser = {
        id: `user-${Date.now()}`,
        name: emailOrPhone.split('@')[0],
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@candidate.com`,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined,
        avatar: '👨‍🎓',
        role: 'candidate',
        targetExam: '৪৭তম বিসিএস প্রিলিমিনারি',
        xp: 1500,
        coins: 100,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        isPro: false,
        createdAt: new Date().toISOString().split('T')[0],
        bookmarkedQuestionIds: [],
        completedTopicIds: [],
        revisionDeck: [],
        examHistory: []
      };
      setUsersList(prev => [newCandidate, ...prev]);
      setCurrentUser(newCandidate);
      return { success: true, message: 'স্বাগতম! নতুন একাউন্টে সফলভাবে লগইন হয়েছেন।' };
    }

    setCurrentUser(existing);
    return { success: true, message: `স্বাগতম, ${existing.name}! লগইন সফল হয়েছে।` };
  };

  const registerCandidate = (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    targetExam: string;
  }): { success: boolean; message?: string } => {
    const existing = usersList.find(
      u => u.email.toLowerCase() === data.email.trim().toLowerCase()
    );
    if (existing) {
      return { success: false, message: 'এই ইমেইল দিয়ে ইতোমধ্যেই একাউন্ট তৈরি করা আছে!' };
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim(),
      avatar: '👨‍🎓',
      role: 'candidate',
      targetExam: data.targetExam || '৪৭তম বিসিএস প্রিলিমিনারি',
      xp: 500,
      coins: 50,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      isPro: false,
      createdAt: new Date().toISOString().split('T')[0],
      bookmarkedQuestionIds: [],
      completedTopicIds: [],
      revisionDeck: [],
      examHistory: []
    };

    setUsersList(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, message: 'অভিনন্দন! আপনার একাউন্ট সফলভাবে তৈরি হয়েছে।' };
  };

  const logoutCandidate = () => {
    // Reset to demo guest user
    const guestUser: AuthUser = {
      id: 'guest',
      name: 'অতিথি পরীক্ষার্থী',
      email: 'guest@medhapath.com',
      avatar: '👤',
      role: 'candidate',
      targetExam: 'বিসিএস প্রিলিমিনারি',
      xp: 0,
      coins: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      isPro: false,
      createdAt: new Date().toISOString().split('T')[0],
      bookmarkedQuestionIds: [],
      completedTopicIds: [],
      revisionDeck: [],
      examHistory: []
    };
    setCurrentUser(guestUser);
  };

  // Super Admin Authentication
  const superAdminLogin = (adminId: string, pass: string): { success: boolean; message?: string } => {
    const trimmedId = adminId.trim().toLowerCase();
    const trimmedPass = pass.trim();

    // Secure credentials check (default: admin / superadmin123 or admin / admin123)
    if (
      (trimmedId === 'admin' || trimmedId === 'superadmin') &&
      (trimmedPass === 'superadmin123' || trimmedPass === 'admin123' || trimmedPass === 'admin')
    ) {
      setIsSuperAdminLoggedIn(true);
      localStorage.setItem('medhapath_admin_session', 'true');
      return { success: true, message: 'সুপার এডমিন লগইন সফল হয়েছে!' };
    }

    return {
      success: false,
      message: 'ভুল এডমিন আইডি অথবা পাসওয়ার্ড! (ডিফল্ট: admin / admin123)'
    };
  };

  const superAdminLogout = () => {
    setIsSuperAdminLoggedIn(false);
    localStorage.removeItem('medhapath_admin_session');
    setActiveView('home');
  };

  // Super Admin: Toggle User Pro Status
  const adminToggleUserPro = (userId: string) => {
    setUsersList(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const newPro = !u.isPro;
          return {
            ...u,
            isPro: newPro,
            proExpiryDate: newPro ? '২০২৬-১২-৩১' : undefined
          };
        }
        return u;
      })
    );

    // If currently logged in user is updated, sync currentUser too
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        isPro: !prev.isPro,
        proExpiryDate: !prev.isPro ? '২০২৬-১২-৩১' : undefined
      }));
    }
  };

  // Super Admin: Delete User
  const adminDeleteUser = (userId: string) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
  };

  // Super Admin: Import OCR Extracted Questions to Database
  const adminAddExtractedQuestions = (newBatch: Omit<Question, 'id'>[]): number => {
    const timestamp = Date.now();
    const formattedQuestions: Question[] = newBatch.map((q, idx) => ({
      ...q,
      id: `ocr-${timestamp}-${idx}`
    }));

    setQuestions(prev => [...formattedQuestions, ...prev]);
    return formattedQuestions.length;
  };

  // Gamification & User Stats
  const addXP = (amount: number) => {
    setCurrentUser(prev => {
      const updated = {
        ...prev,
        xp: prev.xp + amount,
        coins: prev.coins + Math.floor(amount / 5)
      };
      setUsersList(list => list.map(u => (u.id === prev.id ? updated : u)));
      return updated;
    });
  };

  const addCoins = (amount: number) => {
    setCurrentUser(prev => {
      const updated = { ...prev, coins: prev.coins + amount };
      setUsersList(list => list.map(u => (u.id === prev.id ? updated : u)));
      return updated;
    });
  };

  const toggleBookmark = (questionId: string) => {
    setCurrentUser(prev => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      const updated = {
        ...prev,
        bookmarkedQuestionIds: exists
          ? prev.bookmarkedQuestionIds.filter(id => id !== questionId)
          : [...prev.bookmarkedQuestionIds, questionId]
      };
      setUsersList(list => list.map(u => (u.id === prev.id ? updated : u)));
      return updated;
    });
  };

  const markTopicCompleted = (topicId: string) => {
    setCurrentUser(prev => {
      if (prev.completedTopicIds.includes(topicId)) return prev;
      const updated = {
        ...prev,
        completedTopicIds: [...prev.completedTopicIds, topicId],
        xp: prev.xp + 100,
        coins: prev.coins + 25
      };
      setUsersList(list => list.map(u => (u.id === prev.id ? updated : u)));
      return updated;
    });
  };

  const togglePro = (status?: boolean) => {
    setCurrentUser(prev => {
      const newPro = status !== undefined ? status : !prev.isPro;
      const updated = {
        ...prev,
        isPro: newPro,
        proExpiryDate: '২০২৬-১২-৩১'
      };
      setUsersList(list => list.map(u => (u.id === prev.id ? updated : u)));
      return updated;
    });
  };

  // Question manipulation
  const addQuestion = (newQ: Omit<Question, 'id'>) => {
    const id = `custom-${Date.now()}`;
    const questionWithId: Question = { ...newQ, id };
    setQuestions(prev => [questionWithId, ...prev]);
  };

  const updateQuestion = (id: string, updatedFields: Partial<Question>) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updatedFields } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const resetQuestions = () => {
    setQuestions(INITIAL_QUESTIONS);
    localStorage.removeItem('medhapath_questions');
  };

  // Spaced Repetition
  const recordQuestionResult = (questionId: string, isCorrect: boolean) => {
    setCurrentUser(prev => {
      const existingIndex = prev.revisionDeck.findIndex(r => r.questionId === questionId);
      const now = new Date();
      const nextDate = new Date();
      nextDate.setDate(now.getDate() + (isCorrect ? 3 : 1));

      let updatedDeck: RevisionItem[];

      if (existingIndex >= 0) {
        const item = prev.revisionDeck[existingIndex];
        const newCorrect = item.timesCorrect + (isCorrect ? 1 : 0);
        const newWrong = item.timesWrong + (isCorrect ? 0 : 1);
        const status = newCorrect >= 3 ? 'mastered' : newCorrect >= 1 ? 'reviewing' : 'learning';

        const updatedItem: RevisionItem = {
          ...item,
          lastReviewed: now.toISOString(),
          nextReviewDate: nextDate.toISOString(),
          timesReviewed: item.timesReviewed + 1,
          timesCorrect: newCorrect,
          timesWrong: newWrong,
          status
        };

        updatedDeck = [...prev.revisionDeck];
        updatedDeck[existingIndex] = updatedItem;
      } else {
        const newItem: RevisionItem = {
          questionId,
          lastReviewed: now.toISOString(),
          nextReviewDate: nextDate.toISOString(),
          timesReviewed: 1,
          timesCorrect: isCorrect ? 1 : 0,
          timesWrong: isCorrect ? 0 : 1,
          status: isCorrect ? 'reviewing' : 'learning'
        };
        updatedDeck = [newItem, ...prev.revisionDeck];
      }

      const updatedUser = {
        ...prev,
        revisionDeck: updatedDeck
      };
      setUsersList(list => list.map(u => (u.id === prev.id ? updatedUser : u)));
      return updatedUser;
    });
  };

  const getDueRevisionQuestions = (): Question[] => {
    const questionIds = currentUser.revisionDeck.map(r => r.questionId);
    return questions.filter(q => questionIds.includes(q.id));
  };

  // Exam Engine
  const startRandomExam = (config: ExamConfig) => {
    let pool = [...questions];
    if (config.subjectId && config.subjectId !== 'all') {
      pool = pool.filter(q => q.subjectId === config.subjectId);
    }

    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(config.count, shuffled.length));

    const newExam: ExamSession = {
      id: `exam-${Date.now()}`,
      title: config.title || (config.subjectId && config.subjectId !== 'all' ? `${config.subjectId.toUpperCase()} র্যান্ডম স্পেশাল টেস্ট` : 'বিসিএস ফুল র্যান্ডম স্পেশাল মডেল টেস্ট'),
      subjectId: config.subjectId || 'all',
      questions: selected,
      timeLimitMinutes: config.timeMinutes,
      negativeMarking: config.negativeMarking,
      userAnswers: {},
      markedForReview: {},
      isCompleted: false,
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      unansweredCount: selected.length,
      timeSpentSeconds: 0
    };

    setActiveExam(newExam);
  };

  const startSetExam = (examQuestions: Question[], title: string, durationMinutes: number) => {
    const newExam: ExamSession = {
      id: `exam-set-${Date.now()}`,
      title,
      subjectId: 'all',
      questions: examQuestions,
      timeLimitMinutes: durationMinutes,
      negativeMarking: 0.5,
      userAnswers: {},
      markedForReview: {},
      isCompleted: false,
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      unansweredCount: examQuestions.length,
      timeSpentSeconds: 0
    };

    setActiveExam(newExam);
  };

  const submitAnswer = (questionId: string, optionIndex: number) => {
    if (!activeExam || activeExam.isCompleted) return;
    setActiveExam(prev => {
      if (!prev) return null;
      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: optionIndex
        }
      };
    });
  };

  const toggleMarkForReview = (questionId: string) => {
    if (!activeExam || activeExam.isCompleted) return;
    setActiveExam(prev => {
      if (!prev) return null;
      const isMarked = !!prev.markedForReview[questionId];
      return {
        ...prev,
        markedForReview: {
          ...prev.markedForReview,
          [questionId]: !isMarked
        }
      };
    });
  };

  const finishExam = (): ExamSession | null => {
    if (!activeExam) return null;

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    activeExam.questions.forEach(q => {
      const ans = activeExam.userAnswers[q.id];
      if (ans === undefined) {
        unanswered++;
      } else if (ans === q.correctAnswer) {
        correct++;
        recordQuestionResult(q.id, true);
      } else {
        wrong++;
        recordQuestionResult(q.id, false);
      }
    });

    const netScore = Math.max(0, correct - wrong * activeExam.negativeMarking);
    const xpGained = Math.round(correct * 15 + netScore * 10);

    const completedSession: ExamSession = {
      ...activeExam,
      isCompleted: true,
      score: Number(netScore.toFixed(2)),
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      completedAt: new Date().toISOString()
    };

    setActiveExam(completedSession);
    addXP(xpGained);

    setCurrentUser(prev => ({
      ...prev,
      examHistory: [completedSession, ...prev.examHistory]
    }));

    return completedSession;
  };

  const cancelExam = () => {
    setActiveExam(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        user: currentUser,
        usersList,
        loginCandidate,
        registerCandidate,
        logoutCandidate,
        isSuperAdminLoggedIn,
        superAdminLogin,
        superAdminLogout,
        adminToggleUserPro,
        adminDeleteUser,
        adminAddExtractedQuestions,
        addXP,
        addCoins,
        toggleBookmark,
        markTopicCompleted,
        togglePro,
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        resetQuestions,
        recordQuestionResult,
        getDueRevisionQuestions,
        activeExam,
        startRandomExam,
        startSetExam,
        submitAnswer,
        toggleMarkForReview,
        finishExam,
        cancelExam,
        soundEnabled,
        setSoundEnabled
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
