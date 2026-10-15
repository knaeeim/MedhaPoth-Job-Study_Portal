'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Timer, Flag, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { ExamResult } from './ExamResult';

export function ExamRunner() {
  const { activeExam, submitAnswer, toggleMarkForReview, finishExam, cancelExam } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Initialize countdown timer
  useEffect(() => {
    if (activeExam && !activeExam.isCompleted) {
      setSecondsRemaining(activeExam.timeLimitMinutes * 60);
    }
  }, [activeExam]);

  // Timer interval
  useEffect(() => {
    if (!activeExam || activeExam.isCompleted) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam, finishExam]);

  if (!activeExam) return null;

  // If completed, show result view
  if (activeExam.isCompleted) {
    return <ExamResult exam={activeExam} />;
  }

  const currentQuestion = activeExam.questions[currentIdx];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isTimeCritical = secondsRemaining < 120; // less than 2 mins

  const answeredCount = Object.keys(activeExam.userAnswers).length;
  const progressPercent = Math.round((answeredCount / activeExam.questions.length) * 100);

  const isCurrentMarked = !!activeExam.markedForReview[currentQuestion?.id];
  const selectedOption = activeExam.userAnswers[currentQuestion?.id];

  const handleOptionSelect = (optIdx: number) => {
    if (!currentQuestion) return;
    submitAnswer(currentQuestion.id, optIdx);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-20">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            লাইভ পরীক্ষা চলছে
          </span>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-1">
            {activeExam.title}
          </h1>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-base md:text-lg font-bold border transition ${
              isTimeCritical
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-300 dark:border-rose-800 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Timer className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-indigo-500'}`} />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmSubmit(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>সাবমিট করুন</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Exam Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Content (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            {/* Question Meta */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                প্রশ্ন {currentIdx + 1} / {activeExam.questions.length} • {currentQuestion.topic}
              </span>
              <button
                type="button"
                onClick={() => toggleMarkForReview(currentQuestion.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                  isCurrentMarked
                    ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isCurrentMarked ? 'রিভিউ মার্ক করা আছে' : 'রিভিউতে রাখুন'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-relaxed mb-8">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">{currentIdx + 1}.</span>
              {currentQuestion.question}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];
                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleOptionSelect(oIdx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {optionLetters[oIdx]}
                    </span>
                    <span className="text-sm md:text-base font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>

              <button
                type="button"
                disabled={currentIdx === activeExam.questions.length - 1}
                onClick={() => setCurrentIdx(prev => Math.min(activeExam.questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 shadow-sm transition"
              >
                <span>পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Question Palette / Navigation (1 col) */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              প্রশ্ন তালিকা ({answeredCount}/{activeExam.questions.length} সম্পন্ন)
            </h3>

            {/* Question numbers grid */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
              {activeExam.questions.map((q, idx) => {
                const isAns = activeExam.userAnswers[q.id] !== undefined;
                const isRev = !!activeExam.markedForReview[q.id];
                const isCurrent = currentIdx === idx;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs font-bold transition flex items-center justify-center relative ${
                      isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900' : ''
                    } ${
                      isAns
                        ? 'bg-emerald-600 text-white'
                        : isRev
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                    {isRev && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white dark:border-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 shrink-0" />
                <span>উত্তর দেওয়া হয়েছে ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-600 shrink-0" />
                <span>রিভিউ এর জন্য চিহ্নিত ({Object.values(activeExam.markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800 shrink-0" />
                <span>বাকি আছে ({activeExam.questions.length - answeredCount})</span>
              </div>
            </div>

            {/* Cancel Exam Button */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={cancelExam}
                className="w-full text-center text-xs text-rose-600 hover:text-rose-700 py-1 transition"
              >
                পরীক্ষা বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">পরীক্ষা সাবমিট করতে চান?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-6">
              আপনি মোট {activeExam.questions.length} টির মধ্যে {answeredCount} টি প্রশ্নের উত্তর দিয়েছেন। এখনও {activeExam.questions.length - answeredCount} টি অনুত্তরিত রয়েছে।
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ফিরে যান
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmSubmit(false);
                  finishExam();
                }}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                হ্যাঁ, ফলাফল দেখুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
