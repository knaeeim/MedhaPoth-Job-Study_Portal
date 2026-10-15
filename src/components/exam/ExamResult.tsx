'use client';

import React, { useEffect, useState } from 'react';
import { ExamSession } from '@/types';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, XCircle, HelpCircle, Trophy, Bookmark, RotateCcw, Shuffle, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamResultProps {
  exam: ExamSession;
}

export function ExamResult({ exam }: ExamResultProps) {
  const { cancelExam, user, toggleBookmark, startRandomExam } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'wrong' | 'correct' | 'unanswered'>('all');

  const total = exam.questions.length;
  const accuracy = Math.round((exam.correctCount / Math.max(1, exam.correctCount + exam.wrongCount)) * 100) || 0;
  const percentage = Math.round((exam.score / total) * 100);

  useEffect(() => {
    if (percentage >= 50) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 }
      });
    }
  }, [percentage]);

  const filteredQuestions = exam.questions.filter(q => {
    const userAns = exam.userAnswers[q.id];
    if (filterType === 'correct') return userAns === q.correctAnswer;
    if (filterType === 'wrong') return userAns !== undefined && userAns !== q.correctAnswer;
    if (filterType === 'unanswered') return userAns === undefined;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner Result Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-indigo-800/50 relative overflow-hidden mb-8">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              মডেল টেস্ট ফলাফল
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{exam.title}</h1>
            <p className="text-indigo-200 text-xs md:text-sm mt-1">
              নেগেটিভ মার্কিং হিসাব করে চূড়ান্ত স্কোর তৈরি করা হয়েছে
            </p>
          </div>

          {/* Big Score Dial */}
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/15">
            <span className="text-xs text-indigo-200 uppercase tracking-widest font-bold">প্রাপ্ত নম্বর</span>
            <div className="text-4xl md:text-5xl font-black text-amber-400 mt-1">
              {exam.score}
              <span className="text-lg text-white/70 font-normal"> / {total}</span>
            </div>
            <span className="text-xs text-emerald-300 font-semibold mt-1">
              সঠিকতার হার: {accuracy}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <span className="text-xs text-indigo-300">সঠিক উত্তর</span>
            <div className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
              {exam.correctCount}
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <span className="text-xs text-indigo-300">ভুল উত্তর (-{exam.negativeMarking * exam.wrongCount})</span>
            <div className="text-xl font-bold text-rose-400 flex items-center justify-center gap-1 mt-0.5">
              <XCircle className="w-4 h-4" />
              {exam.wrongCount}
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <span className="text-xs text-indigo-300">অনুত্তরিত</span>
            <div className="text-xl font-bold text-slate-300 flex items-center justify-center gap-1 mt-0.5">
              <HelpCircle className="w-4 h-4" />
              {exam.unansweredCount}
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <span className="text-xs text-indigo-300">অর্জিত এক্সপি</span>
            <div className="text-xl font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
              <Sparkles className="w-4 h-4" />
              +{Math.round(exam.correctCount * 15 + exam.score * 10)} XP
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            সব প্রশ্ন ({total})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('wrong')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              filterType === 'wrong'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'border-slate-200 dark:border-slate-800 text-rose-600 hover:bg-rose-50'
            }`}
          >
            ভুল উত্তর ({exam.wrongCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('correct')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              filterType === 'correct'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-slate-200 dark:border-slate-800 text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            সঠিক উত্তর ({exam.correctCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              cancelExam();
              startRandomExam({ count: 10, timeMinutes: 10, negativeMarking: 0.5 });
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>নতুন র্যান্ডম টেস্ট দিন</span>
          </button>
          <button
            type="button"
            onClick={cancelExam}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>হোমে ফিরুন</span>
          </button>
        </div>
      </div>

      {/* Detailed Solution / Question Review Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          প্রতিটি প্রশ্নের সঠিক উত্তর ও বিশদ ব্যাখ্যা
        </h2>

        {filteredQuestions.map((q, idx) => {
          const userAns = exam.userAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          const isSkipped = userAns === undefined;
          const isBookmarked = user.bookmarkedQuestionIds.includes(q.id);
          const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 transition ${
                isCorrect
                  ? 'border-emerald-200 dark:border-emerald-950/70'
                  : isSkipped
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-rose-200 dark:border-rose-950/70'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    প্রশ্ন {idx + 1} • {q.topic}
                  </span>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    [{q.examSource}]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                        : isSkipped
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                        : 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400'
                    }`}
                  >
                    {isCorrect ? '✓ সঠিক' : isSkipped ? '— অনুত্তরিত' : '✗ ভুল'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'text-amber-500 fill-amber-500' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {q.question}
              </div>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {q.options.map((opt, oIdx) => {
                  const isThisCorrect = oIdx === q.correctAnswer;
                  const isUserSelection = oIdx === userAns;

                  return (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-xl text-xs md:text-sm font-medium flex items-center gap-2 border ${
                        isThisCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold'
                          : isUserSelection
                          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shrink-0">
                        {optionLetters[oIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isThisCorrect && (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                          (সঠিক উত্তর)
                        </span>
                      )}
                      {isUserSelection && !isThisCorrect && (
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 shrink-0">
                          (আপনার উত্তর)
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Comprehensive Bangla Explanation */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>ব্যাখ্যা ও শর্টকাট নোট:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
