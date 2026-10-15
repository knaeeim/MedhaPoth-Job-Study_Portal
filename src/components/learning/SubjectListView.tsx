'use client';

import React, { useState } from 'react';
import { SubjectId, LessonTopic } from '@/types';
import { SUBJECTS } from '@/data/subjects';
import { LESSON_TOPICS } from '@/data/lessonsData';
import { useApp } from '@/context/AppContext';
import { ConceptOverview } from './ConceptOverview';
import { BookOpen, Layers, CheckCircle2, ArrowRight, Play, Sparkles } from 'lucide-react';

interface SubjectListViewProps {
  initialSubjectId?: SubjectId;
}

export function SubjectListView({ initialSubjectId }: SubjectListViewProps) {
  const { user } = useApp();
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(initialSubjectId || 'bangla');
  const [activeTopic, setActiveTopic] = useState<LessonTopic | null>(null);

  // If a topic is opened, show ConceptOverview (the prerequisite concept breakdown + games)
  if (activeTopic) {
    return (
      <ConceptOverview
        topic={activeTopic}
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  const currentSubjectMeta = SUBJECTS.find(s => s.id === selectedSubjectId) || SUBJECTS[0];
  const subjectLessons = LESSON_TOPICS.filter(t => t.subjectId === selectedSubjectId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {SUBJECTS.map((sub) => {
          const isSelected = selectedSubjectId === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{sub.nameBangla.split(' ')[0]}</span>
              <span className="text-[10px] opacity-75">({sub.totalTopics})</span>
            </button>
          );
        })}
      </div>

      {/* Selected Subject Banner */}
      <div className={`rounded-3xl p-6 md:p-8 bg-gradient-to-r ${currentSubjectMeta.color} text-white shadow-xl`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>গেমিফাইড সিলেবাস</span>
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              {currentSubjectMeta.nameBangla}
            </h1>
            <p className="text-white/80 text-xs md:text-sm mt-1 max-w-xl">
              {currentSubjectMeta.description}
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
            <span className="text-xs text-white/80 uppercase tracking-widest block">সিলেবাস কভার</span>
            <span className="text-xl font-black">
              {user.completedTopicIds.filter(id => id.startsWith(selectedSubjectId)).length} / {subjectLessons.length || 1} সম্পন্ন
            </span>
          </div>
        </div>
      </div>

      {/* Topics List with Roadmap Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>টপিক ও অধ্যায়সমূহ (বেসিক আলোচনা ও গেম)</span>
        </h2>

        {subjectLessons.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
            এই বিষয়ের আরও নতুন অধ্যায় শীঘ্রই যুক্ত হচ্ছে।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectLessons.map((lesson, idx) => {
              const isCompleted = user.completedTopicIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                        {lesson.badge}
                      </span>
                      {isCompleted ? (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>সম্পন্ন</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">শুরু করা হয়নি</span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>বেসিক ধারণা</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{lesson.flashcards.length}টি ফ্ল্যাশ কার্ড</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>ম্যাচিং গেম</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveTopic(lesson)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>বেসিক আলোচনা ও গেম শুরু করুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
