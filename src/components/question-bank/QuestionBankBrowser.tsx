'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PAST_EXAMS } from '@/data/pastExamsData';
import { SUBJECTS } from '@/data/subjects';
import { Question, SubjectId } from '@/types';
import { Search, Filter, BookOpen, Timer, Bookmark, Sparkles, ChevronDown, ChevronUp, Shuffle, Play } from 'lucide-react';

export function QuestionBankBrowser() {
  const { questions, startSetExam, toggleBookmark, user } = useApp();

  const [activeTab, setActiveTab] = useState<'past-exams' | 'all-questions'>('past-exams');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllExplanations, setShowAllExplanations] = useState<boolean>(false);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);
  const [activeExamDetailId, setActiveExamDetailId] = useState<string | null>(null);

  // Toggle individual question explanation
  const toggleExplanation = (id: string) => {
    setExpandedQuestionIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Filtered questions
  const filteredQuestions = questions.filter(q => {
    const matchesSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.examSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesSearch;
  });

  const handleStartExamOnSet = (examSetId: string) => {
    const exam = PAST_EXAMS.find(e => e.id === examSetId);
    if (!exam) return;

    // Filter questions relevant to this exam or sample questions from bank
    const examQuestions = questions.slice(0, 10);
    startSetExam(examQuestions, `${exam.title} - অফিসিয়াল মক টেস্ট`, 15);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            বিশাল প্রশ্নব্যাংক কালেকশন
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            বিগত সালের প্রশ্ন ও ব্যাখ্যা আর্কাইভ
          </h1>
          <p className="text-emerald-100 text-xs md:text-sm mt-1 max-w-xl">
            ১০ম থেকে ৪৬তম বিসিএস, প্রাথমিক শিক্ষক নিয়োগ, ব্যাংক ও এনটিআরসিএ পরীক্ষার প্রশ্ন পড়ুন অথবা সরাসরি পরীক্ষা দিন।
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('past-exams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'past-exams'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            বিগত সালের প্রশ্নপত্র
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all-questions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'all-questions'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            টপিকভিত্তিক ব্যাংক ({questions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Past Exam Sets (BCS 46, 45, Primary, Bank) */}
      {activeTab === 'past-exams' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAST_EXAMS.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {exam.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {exam.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {exam.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {exam.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
                    <span>{exam.totalQuestions} টি প্রশ্ন</span>
                    <span>•</span>
                    <span>{exam.durationMinutes} মিনিট</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{exam.participants.toLocaleString()} জন পরীক্ষক</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubject('all');
                      setActiveTab('all-questions');
                    }}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>প্রশ্ন পড়ুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartExamOnSet(exam.id)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>পরীক্ষা দিন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: All Questions Explorer */}
      {activeTab === 'all-questions' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="প্রশ্ন, টপিক বা সাল দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Subject Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  selectedSubject === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-100'
                }`}
              >
                সব বিষয়
              </button>
              {SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSubject(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                    selectedSubject === s.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.nameBangla.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Global Explanation Toggle */}
            <button
              type="button"
              onClick={() => setShowAllExplanations(!showAllExplanations)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
            >
              {showAllExplanations ? 'সব ব্যাখ্যা লুকান' : 'সব ব্যাখ্যা দেখান'}
            </button>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">আপনার অনুসন্ধানের সাথে কোনো প্রশ্ন মেলেনি।</p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const isBookmarked = user.bookmarkedQuestionIds.includes(q.id);
                const isExpanded = showAllExplanations || expandedQuestionIds.includes(q.id);
                const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];

                return (
                  <div
                    key={q.id}
                    className="p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          #{idx + 1} • {q.topic}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          [{q.examSource}]
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleBookmark(q.id)}
                        className="p-1 text-slate-400 hover:text-amber-500"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                      {q.question}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correctAnswer;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl text-xs md:text-sm font-medium flex items-center gap-2 border ${
                              isExpanded && isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shrink-0">
                              {optionLetters[oIdx]}
                            </span>
                            <span>{opt}</span>
                            {isExpanded && isCorrect && (
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
                                ✓ সঠিক
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Toggle Explanation Button */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'ব্যাখ্যা লুকান' : 'সঠিক উত্তর ও বিশদ ব্যাখ্যা দেখুন'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex gap-1">
                        {q.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Explanation */}
                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 animate-fade-in">
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>বিশদ ব্যাখ্যা ও শর্টকাট ট্রিক:</span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
