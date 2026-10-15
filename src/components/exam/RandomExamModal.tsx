'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SubjectId } from '@/types';
import { SUBJECTS } from '@/data/subjects';
import { Shuffle, X, Timer, AlertCircle, Sparkles } from 'lucide-react';

interface RandomExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExamStarted?: () => void;
}

export function RandomExamModal({ isOpen, onClose, onExamStarted }: RandomExamModalProps) {
  const { startRandomExam, questions } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeMinutes, setTimeMinutes] = useState<number>(10);
  const [negativeMarking, setNegativeMarking] = useState<number>(0.5);

  if (!isOpen) return null;

  // Calculate available question count in db for selected filter
  const availableCount = selectedSubject === 'all'
    ? questions.length
    : questions.filter(q => q.subjectId === selectedSubject).length;

  const handleStartExam = () => {
    startRandomExam({
      subjectId: selectedSubject,
      count: Math.min(questionCount, availableCount),
      timeMinutes,
      negativeMarking
    });
    onClose();
    if (onExamStarted) onExamStarted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Shuffle className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              র্যান্ডম মডেল টেস্ট জেনারেটর
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              আমাদের ডাটাবেজ থেকে স্বয়ংক্রিয়ভাবে র্যান্ডম প্রশ্ন নিয়ে কাস্টম টেস্ট তৈরি করুন
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Subject Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              বিষয় নির্বাচন করুন
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedSubject('all')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition ${
                  selectedSubject === 'all'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                🌐 পূর্ণাঙ্গ বিসিএস (সব বিষয়)
              </button>
              {SUBJECTS.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition truncate ${
                    selectedSubject === sub.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {sub.nameBangla.split(' ')[0]} ({sub.nameBangla.split(' ')[1] || ''})
                </button>
              ))}
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ডাটাবেজে বর্তমানে {availableCount}টি প্রশ্ন র্যান্ডমাইজেশনের জন্য প্রস্তুত</span>
            </div>
          </div>

          {/* Question Count Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              প্রশ্নের সংখ্যা
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                    questionCount === num
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {num} টি প্রশ্ন
                </button>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-indigo-500" />
              সময়সীমা (মিনিট)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTimeMinutes(m)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                    timeMinutes === m
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {m} মিনিট
                </button>
              ))}
            </div>
          </div>

          {/* Negative Marking Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              নেগেটিভ মার্কিং (প্রতি ভুল উত্তরের জন্য কর্তন)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 0.5, label: '০.৫০ (বিসিএস স্ট্যান্ডার্ড)' },
                { val: 0.25, label: '০.২৫ (ব্যাংক স্ট্যান্ডার্ড)' },
                { val: 0, label: 'নেগেটিভ নেই (প্র্যাকটিস)' },
              ].map((neg) => (
                <button
                  key={neg.val}
                  type="button"
                  onClick={() => setNegativeMarking(neg.val)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border text-center transition ${
                    negativeMarking === neg.val
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {neg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            বাতিল
          </button>
          <button
            type="button"
            onClick={handleStartExam}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
          >
            <Shuffle className="w-4 h-4" />
            <span>র্যান্ডম পরীক্ষা শুরু করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
