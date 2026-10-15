'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SUBJECTS } from '@/data/subjects';
import { PAST_EXAMS } from '@/data/pastExamsData';
import { SubjectId } from '@/types';
import { Shuffle, Sparkles, Flame, BookOpen, Layers, ArrowRight, Trophy, Zap, Shield, Target, Play, Brain } from 'lucide-react';

interface HomeDashboardProps {
  onSelectSubject: (subId: SubjectId) => void;
  onOpenRandomExam: () => void;
  onNavigate: (view: string) => void;
}

export function HomeDashboard({
  onSelectSubject,
  onOpenRandomExam,
  onNavigate
}: HomeDashboardProps) {
  const { user, getDueRevisionQuestions, questions } = useApp();
  const dueRevisionCount = user.revisionDeck.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>বিসিএস, ব্যাংক ও সরকারি চাকরি প্রস্তুতি ২০২৫-২৬</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            বেসিক বুঝে পড়ুন, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300">গেমিফাইড পদ্ধতিতে</span> মনে রাখুন!
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            প্রতিটি বিষয়ের গোড়া থেকে বেসিক কনসেপ্ট ও রুলস শিখুন, ৩ডি ফ্ল্যাশ কার্ড ও ম্যাচিং গেম খেলে জ্ঞান মজবুত করুন এবং বিগত সালের প্রশ্ন ব্যাংকে র্যান্ডম মডেল টেস্ট দিন।
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onOpenRandomExam}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs md:text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Shuffle className="w-4 h-4" />
              <span>র্যান্ডম প্রশ্ন দিয়ে টেস্ট দিন</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('revision')}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transition"
            >
              <Brain className="w-4 h-4 text-purple-300" />
              <span>স্মার্ট রিভিশন ({dueRevisionCount})</span>
            </button>
          </div>
        </div>

        {/* Decorative Floating Element */}
        <div className="hidden lg:block absolute right-10 bottom-6 w-80 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-300">আপনার আজকের লক্ষ্য</span>
            <span className="text-xs font-mono font-bold text-amber-300">{user.streak} দিন স্ট্রিক</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-200">মোট অর্জিত এক্সপি</span>
              <span className="font-bold text-white">{user.xp} XP</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-3/4 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-emerald-200 pt-1">
              <span>পরবর্তী লেভেল: ৫</span>
              <span>৭৫% অর্জিত</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Subject Cards */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              প্রস্তুতির মূল বিষয়সমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              বেসিক আলোচনা থেকে শুরু করে গেম ও কুইজ পর্যন্ত প্রতিটি বিষয় সাজানো
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('subjects')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((sub) => {
            const isCompletedAny = user.completedTopicIds.some(id => id.startsWith(sub.id));

            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${sub.color} flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {sub.totalTopics} টি চাপ্টার
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {sub.nameBangla}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {sub.nameEnglish}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>বেসিক ও গেম শুরু করুন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  {isCompletedAny && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      ✓ প্রগতিশীল
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Bank & Past Exam Highlights */}
      <div className="bg-slate-100/70 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>বিশাল কোশ্চেন ব্যাংক কালেকশন</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              বিগত সালের বিসিএস ও চাকরির প্রশ্নপত্র
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              যেকোনো সেটের প্রশ্ন পড়ুন অথবা সরাসরি টাইমার অন করে মক টেস্ট দিন
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('past-exams')}
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>সম্পূর্ণ কোশ্চেন ব্যাংক খুলুন ({questions.length}+ প্রশ্ন)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAST_EXAMS.slice(0, 3).map((exam) => (
            <div
              key={exam.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                  {exam.categoryLabel}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {exam.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {exam.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{exam.totalQuestions} টি প্রশ্ন</span>
                <button
                  type="button"
                  onClick={() => onNavigate('past-exams')}
                  className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
                >
                  <span>পরীক্ষা দিন</span>
                  <Play className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
