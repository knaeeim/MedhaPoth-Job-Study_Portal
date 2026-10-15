'use client';

import React, { useState } from 'react';
import { LessonTopic } from '@/types';
import { useApp } from '@/context/AppContext';
import { BookOpen, Sparkles, AlertTriangle, Lightbulb, Gamepad2, ArrowRight, Layers, Flame, Trophy } from 'lucide-react';
import { FlashcardGame } from '../gamification/FlashcardGame';
import { FormulaMatchGame } from '../gamification/FormulaMatchGame';

interface ConceptOverviewProps {
  topic: LessonTopic;
  onBack: () => void;
}

export function ConceptOverview({ topic, onBack }: ConceptOverviewProps) {
  const { markTopicCompleted, addXP } = useApp();
  const [activeTab, setActiveTab] = useState<'concept' | 'flashcards' | 'match' | 'quiz'>('concept');

  const handleFinishConcept = () => {
    markTopicCompleted(topic.id);
    addXP(50);
    setActiveTab('flashcards');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 transition"
        >
          ← বিষয় তালিকায় ফিরুন
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          {topic.badge}
        </span>
      </div>

      {/* Topic Title Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {topic.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {topic.description}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('concept')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'concept'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>বেসিক আলোচনা</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'flashcards'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ফ্ল্যাশ কার্ড</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('match')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'match'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>ম্যাচ গেম</span>
            </button>
          </div>
        </div>
      </div>

      {/* Concept Breakdown Tab */}
      {activeTab === 'concept' && (
        <div className="space-y-6 animate-fade-in">
          {topic.prerequisiteConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {concept.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {concept.summary}
              </p>

              {/* Key Bullet Points */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  মৌলিক নিয়ম ও পয়েন্টসমূহ:
                </span>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  {concept.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Master Formula / Shortcut Rule */}
              {concept.formulaOrRule && (
                <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block">
                      শর্টকাট ট্রিক / মাস্টার রুল
                    </span>
                    <p className="text-xs md:text-sm text-indigo-800 dark:text-indigo-200 font-semibold mt-0.5">
                      {concept.formulaOrRule}
                    </p>
                  </div>
                </div>
              )}

              {/* Common Exam Pitfall / Trap */}
              {concept.commonTrap && (
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-rose-900 dark:text-rose-300 block">
                      পরীক্ষার সাধারণ ফাঁদ ও ভুলসমূহ (Common Pitfalls)
                    </span>
                    <p className="text-xs md:text-sm text-rose-800 dark:text-rose-200 mt-0.5">
                      {concept.commonTrap}
                    </p>
                  </div>
                </div>
              )}

              {/* Example with Solution Note */}
              {concept.example && (
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">
                    বাস্তব পরীক্ষার উদাহরণ:
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {concept.example.q}
                  </div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                    উত্তর: {concept.example.a}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    নোট: {concept.example.note}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* CTA to Next Stage */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-600/20">
            <div>
              <h4 className="text-lg font-bold">বেসিক পড়া সম্পন্ন করেছেন?</h4>
              <p className="text-xs text-emerald-100 mt-0.5">
                এবার স্মৃতিশক্তি যাচাই করতে ফ্ল্যাশ কার্ড ও ম্যাচিং গেম খেলুন! (+৫০ XP)
              </p>
            </div>
            <button
              type="button"
              onClick={handleFinishConcept}
              className="px-6 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold shadow-sm transition flex items-center gap-2 shrink-0"
            >
              <span>গেমে এগিয়ে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Flashcard Learning Game Tab */}
      {activeTab === 'flashcards' && (
        <FlashcardGame
          flashcards={topic.flashcards}
          onCompleted={() => setActiveTab('match')}
        />
      )}

      {/* Formula Match Game Tab */}
      {activeTab === 'match' && (
        <FormulaMatchGame
          pairs={topic.matchGameItems}
          onCompleted={() => onBack()}
        />
      )}
    </div>
  );
}
