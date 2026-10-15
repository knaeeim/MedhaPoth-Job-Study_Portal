'use client';

import React, { useState } from 'react';
import { Flashcard } from '@/types';
import { useApp } from '@/context/AppContext';
import { RotateCw, CheckCircle2, ChevronRight, HelpCircle, Sparkles, Layers, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardGameProps {
  flashcards: Flashcard[];
  onCompleted?: () => void;
}

export function FlashcardGame({ flashcards, onCompleted }: FlashcardGameProps) {
  const { addXP, addCoins } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [easyCount, setEasyCount] = useState<number>(0);

  if (flashcards.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500">এই টপিকের জন্য কোনো ফ্ল্যাশ কার্ড নেই।</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIdx];

  const handleRating = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (difficulty === 'easy') {
      addXP(15);
      addCoins(3);
      setEasyCount(prev => prev + 1);
    } else if (difficulty === 'medium') {
      addXP(10);
      addCoins(2);
    } else {
      addXP(5);
    }

    if (currentIdx < flashcards.length - 1) {
      setIsFlipped(false);
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setIsFlipped(false);
    setIsCompleted(false);
    setEasyCount(0);
  };

  if (isCompleted) {
    return (
      <div className="p-8 md:p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          🎉 চমৎকার! সব ফ্ল্যাশ কার্ড সম্পন্ন!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
          আপনি মোট {flashcards.length}টি ধারণার মধ্যে {easyCount}টিতে পূর্ণ আত্মবিশ্বাস দেখিয়েছেন।
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 transition"
          >
            পুনরায় অনুশীলন করুন
          </button>
          {onCompleted && (
            <button
              type="button"
              onClick={onCompleted}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
            >
              <span>পরবর্তী ম্যাচিং গেম খেলুন</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
          <Layers className="w-4 h-4" />
          কার্ড {currentIdx + 1} / {flashcards.length}
        </span>
        <span>কার্ডে ক্লিক করে উত্তর উল্টান</span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] perspective-1000 cursor-pointer select-none group"
      >
        <div
          className={`relative w-full h-full min-h-[300px] rounded-3xl transition-transform duration-500 transform-style-preserve-3d shadow-md border ${
            isFlipped
              ? 'rotate-y-180 bg-gradient-to-br from-indigo-900 to-slate-900 border-indigo-700 text-white'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
          }`}
        >
          {/* Front of Card */}
          <div
            className={`absolute inset-0 p-8 flex flex-col justify-between backface-hidden ${
              isFlipped ? 'invisible' : 'visible'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                প্রশ্ন / কনসেপ্ট
              </span>
              <RotateCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
            </div>

            <div className="my-auto text-center py-6">
              <h3 className="text-xl md:text-2xl font-extrabold leading-snug">
                {currentCard.front}
              </h3>
              {currentCard.hint && (
                <div className="inline-flex items-center gap-1 text-xs text-slate-400 mt-4 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>হিন্ট: {currentCard.hint}</span>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-slate-400 font-semibold">
              🔄 উত্তর দেখতে যেকোনো জায়গায় ট্যাপ বা ক্লিক করুন
            </div>
          </div>

          {/* Back of Card (Answer) */}
          <div
            className={`absolute inset-0 p-8 flex flex-col justify-between backface-hidden rotate-y-180 ${
              !isFlipped ? 'invisible' : 'visible'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                ✓ সঠিক উত্তর ও ব্যাখ্যা
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <div className="my-auto text-center py-6">
              <h3 className="text-2xl md:text-3xl font-black text-emerald-400 leading-snug">
                {currentCard.back}
              </h3>
            </div>

            <div className="text-center text-xs text-indigo-200">
              নিচে আপনার আত্মবিশ্বাসের মাত্রা নির্বাচন করুন
            </div>
          </div>
        </div>
      </div>

      {/* Response Action Buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => handleRating('hard')}
          className="p-2.5 sm:p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-[11px] sm:text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/50 transition flex flex-col items-center justify-center gap-1 text-center"
        >
          <span>মনে পড়েনি</span>
          <span className="text-[10px] text-rose-500 font-normal">+৫ XP</span>
        </button>

        <button
          type="button"
          onClick={() => handleRating('medium')}
          className="p-2.5 sm:p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[11px] sm:text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/50 transition flex flex-col items-center justify-center gap-1 text-center"
        >
          <span>মাঝারি</span>
          <span className="text-[10px] text-amber-500 font-normal">+১০ XP</span>
        </button>

        <button
          type="button"
          onClick={() => handleRating('easy')}
          className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[11px] sm:text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition flex flex-col items-center justify-center gap-1 text-center"
        >
          <span>একদম সহজ</span>
          <span className="text-[10px] text-emerald-500 font-normal">+১৫ XP</span>
        </button>
      </div>
    </div>
  );
}
