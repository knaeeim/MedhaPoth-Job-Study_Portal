'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LEADERBOARD_USERS } from '@/data/leaderboardData';
import { Trophy, Flame, Zap, Award, Target, Crown } from 'lucide-react';

export function LeaderboardView() {
  const { user } = useApp();
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'all'>('weekly');

  const top3 = LEADERBOARD_USERS.slice(0, 3);
  const remaining = LEADERBOARD_USERS.slice(3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-xs font-bold mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>জাতীয় মেধা তালিকা ও লিডারবোর্ড</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          সেরা চাকরি প্রার্থীদের প্রতিযোগিতা
        </h1>
        <p className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400">
          প্রতিদিনের কুইজ, মডেল টেস্ট ও স্ট্রিক বজায় রেখে পয়েন্ট অর্জন করুন এবং মেধা তালিকায় শীর্ষস্থান অধিকার করুন।
        </p>

        {/* Time Tabs */}
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-5">
          {[
            { id: 'daily', label: 'আজকের তালিকা' },
            { id: 'weekly', label: 'এই সপ্তাহের সেরা' },
            { id: 'all', label: 'সর্বকালের রেকর্ড' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTimeRange(tab.id as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                timeRange === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium (Gamified) */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 items-end mb-8 pt-6">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 text-center border border-slate-200 dark:border-slate-800 shadow-sm relative flex flex-col items-center">
            <span className="text-2xl md:text-3xl mb-1">{top3[1].avatar}</span>
            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center mb-2">
              ২
            </span>
            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white truncate max-w-full">
              {top3[1].name}
            </h3>
            <span className="text-[10px] md:text-xs text-amber-600 font-semibold mt-0.5">
              {top3[1].badge.split(' ')[1] || 'রানার আপ'}
            </span>
            <div className="mt-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              {top3[1].xp} XP
            </div>
          </div>
        )}

        {/* 1st Place (Champion) */}
        {top3[0] && (
          <div className="bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900 rounded-3xl p-5 md:p-8 text-center border-2 border-amber-400 dark:border-amber-500/50 shadow-xl relative flex flex-col items-center -translate-y-3">
            <Crown className="w-6 h-6 text-amber-500 mb-1 animate-bounce" />
            <span className="text-3xl md:text-4xl mb-1">{top3[0].avatar}</span>
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 text-xs font-black flex items-center justify-center mb-2 shadow-sm">
              ১
            </span>
            <h3 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white truncate max-w-full">
              {top3[0].name}
            </h3>
            <span className="text-[11px] md:text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">
              {top3[0].badge}
            </span>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs md:text-sm font-black shadow-sm">
              {top3[0].xp} XP
            </div>
            <div className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-bold mt-2">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{top3[0].streak} দিন স্ট্রিক!</span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 text-center border border-slate-200 dark:border-slate-800 shadow-sm relative flex flex-col items-center">
            <span className="text-2xl md:text-3xl mb-1">{top3[2].avatar}</span>
            <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center mb-2">
              ৩
            </span>
            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white truncate max-w-full">
              {top3[2].name}
            </h3>
            <span className="text-[10px] md:text-xs text-amber-700 font-semibold mt-0.5">
              {top3[2].badge.split(' ')[1] || 'তৃতীয়'}
            </span>
            <div className="mt-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              {top3[2].xp} XP
            </div>
          </div>
        )}
      </div>

      {/* Logged in User Standing Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center">
            #৮
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold">{user.name} (আপনি)</h4>
              {user.isPro && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black">
                  PRO
                </span>
              )}
            </div>
            <p className="text-xs text-indigo-100 mt-0.5">লক্ষ্য: {user.targetExam}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-amber-300">
            <Flame className="w-4 h-4 fill-amber-300" />
            <span>{user.streak} দিন</span>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-xl">
            {user.xp} XP
          </div>
        </div>
      </div>

      {/* Remaining Leaderboard List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {remaining.map((player) => (
          <div
            key={player.id}
            className="p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-6 text-center font-bold text-xs text-slate-400">
                #{player.rank}
              </span>
              <span className="text-2xl">{player.avatar}</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {player.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    {player.badge}
                  </span>
                  <span>•</span>
                  <span>{player.accuracy}% নির্ভুলতা</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="hidden sm:flex items-center gap-1 text-slate-500">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{player.streak} দিন</span>
              </div>
              <div className="font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl">
                {player.xp} XP
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
