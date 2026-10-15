'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Question } from '@/types';
import { RotateCcw, Brain, CheckCircle2, Bookmark, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RevisionDeck() {
  const { user, questions, recordQuestionResult, toggleBookmark, addXP } = useApp();

  const [activePracticeIndex, setActivePracticeIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'all' | 'due' | 'bookmarks'>('due');

  // Map revision items with question details
  const revisionQuestions = user.revisionDeck.map(rev => {
    const q = questions.find(item => item.id === rev.questionId);
    return { rev, q };
  }).filter((item): item is { rev: typeof item.rev; q: Question } => item.q !== undefined);

  // Bookmarked questions
  const bookmarkedQuestions = questions.filter(q => user.bookmarkedQuestionIds.includes(q.id));

  // Determine current active list based on filter
  const currentList = filterMode === 'bookmarks'
    ? bookmarkedQuestions
    : revisionQuestions.map(item => item.q);

  const activeQuestion = activePracticeIndex !== null ? currentList[activePracticeIndex] : null;

  const handleStartPractice = (index: number = 0) => {
    setActivePracticeIndex(index);
    setSelectedOption(null);
    setIsRevealed(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isRevealed) return;
    setSelectedOption(idx);
    setIsRevealed(true);

    if (activeQuestion) {
      const isCorrect = idx === activeQuestion.correctAnswer;
      recordQuestionResult(activeQuestion.id, isCorrect);
      if (isCorrect) {
        addXP(20);
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleNext = () => {
    if (activePracticeIndex !== null && activePracticeIndex < currentList.length - 1) {
      setActivePracticeIndex(prev => (prev !== null ? prev + 1 : 0));
      setSelectedOption(null);
      setIsRevealed(false);
    } else {
      setActivePracticeIndex(null);
      setSelectedOption(null);
      setIsRevealed(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold mb-3">
            <Brain className="w-3.5 h-3.5 text-purple-300" />
            স্মার্ট স্পেসড রেপিটিশন সিস্টেম
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            স্মার্ট রিভিশন ডেক
          </h1>
          <p className="text-purple-200 text-xs md:text-sm mt-1 max-w-lg">
            পরীক্ষায় ভুল করা প্রশ্ন এবং বুকমার্ক করা টপিকগুলো নিয়মিত রিভিশন দিয়ে দীর্ঘমেয়াদী স্মৃতিতে স্থায়ী করুন।
          </p>
        </div>

        <div className="flex gap-3">
          {currentList.length > 0 && activePracticeIndex === null && (
            <button
              type="button"
              onClick={() => handleStartPractice(0)}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>রিভিশন টেস্ট শুরু করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Practice Mode */}
      {activeQuestion ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-indigo-600">
              রিভিশন প্রশ্ন {(activePracticeIndex ?? 0) + 1} / {currentList.length} • {activeQuestion.topic}
            </span>
            <button
              type="button"
              onClick={() => setActivePracticeIndex(null)}
              className="text-slate-400 hover:text-slate-600 font-semibold"
            >
              তালিকায় ফিরে যান ✕
            </button>
          </div>

          <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {activeQuestion.question}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeQuestion.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === activeQuestion.correctAnswer;
              const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`p-4 rounded-xl text-left text-xs md:text-sm font-semibold border-2 transition flex items-center gap-3 ${
                    isRevealed
                      ? isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                        : isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300'
                        : 'border-slate-200 dark:border-slate-800 opacity-60'
                      : isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                    {optionLetters[oIdx]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation if Revealed */}
          {isRevealed && (
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 animate-fade-in">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>রিভিশন নোট ও ব্যাখ্যা:</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeQuestion.explanation}
              </p>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>
                    {(activePracticeIndex ?? 0) < currentList.length - 1 ? 'পরবর্তী রিভিশন প্রশ্ন' : 'রিভিশন সমাপ্ত করুন'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Overview Deck Cards */
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterMode('due')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                filterMode === 'due'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-100'
              }`}
            >
              আজকের রিভিশন তালিকা ({revisionQuestions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('bookmarks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                filterMode === 'bookmarks'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-100'
              }`}
            >
              বুকমার্ক করা প্রশ্নসমূহ ({bookmarkedQuestions.length})
            </button>
          </div>

          {currentList.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                কোনো পেন্ডিং রিভিশন নেই!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                মডেল টেস্ট দেওয়ার সময় যেসব প্রশ্নে ভুল হবে, সেগুলো স্বয়ংক্রিয়ভাবে এখানে যুক্ত হয়ে যাবে।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentList.map((q, idx) => {
                const isBookmarked = user.bookmarkedQuestionIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                          {q.topic}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleBookmark(q.id)}
                          className="text-slate-400 hover:text-amber-500"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                        {q.question}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{q.examSource}</span>
                      <button
                        type="button"
                        onClick={() => handleStartPractice(idx)}
                        className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                      >
                        <span>অনুশীলন করুন</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
