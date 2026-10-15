'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { HomeDashboard } from '@/components/dashboard/HomeDashboard';
import { SubjectListView } from '@/components/learning/SubjectListView';
import { RevisionDeck } from '@/components/revision/RevisionDeck';
import { QuestionBankBrowser } from '@/components/question-bank/QuestionBankBrowser';
import { LeaderboardView } from '@/components/leaderboard/LeaderboardView';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ExamRunner } from '@/components/exam/ExamRunner';
import { RandomExamModal } from '@/components/exam/RandomExamModal';
import { SubscriptionModal } from '@/components/pricing/SubscriptionModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { SubjectId } from '@/types';

function MainApp() {
  const { activeExam, activeView, setActiveView } = useApp();
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('bangla');
  const [isRandomModalOpen, setIsRandomModalOpen] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const handleSelectSubject = (subId: SubjectId) => {
    setSelectedSubjectId(subId);
    setActiveView('subjects');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenRandomModal={() => setIsRandomModalOpen(true)}
        onOpenSubscriptionModal={() => setIsSubscriptionModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeExam ? (
          <ExamRunner />
        ) : (
          <>
            {activeView === 'home' && (
              <HomeDashboard
                onSelectSubject={handleSelectSubject}
                onOpenRandomExam={() => setIsRandomModalOpen(true)}
                onNavigate={view => setActiveView(view)}
              />
            )}

            {activeView === 'subjects' && (
              <SubjectListView initialSubjectId={selectedSubjectId} />
            )}

            {activeView === 'revision' && <RevisionDeck />}

            {activeView === 'past-exams' && <QuestionBankBrowser />}

            {activeView === 'leaderboard' && <LeaderboardView />}

            {activeView === 'admin' && <AdminDashboard />}
          </>
        )}
      </main>

      {/* Modals */}
      <RandomExamModal
        isOpen={isRandomModalOpen}
        onClose={() => setIsRandomModalOpen(false)}
      />

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Modern Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
              মেধাপথ (MedhaPath)
            </span>
            <span>—</span>
            <span>চাকরি প্রার্থীদের জন্য স্মার্ট ও গেমিফাইড প্রস্তুতি প্ল্যাটফর্ম</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="hover:underline font-semibold text-emerald-600 dark:text-emerald-400"
            >
              সাবস্ক্রিপশন প্ল্যান
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveView('past-exams')}
              className="hover:underline"
            >
              বিগত সালের প্রশ্নব্যাংক
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveView('admin')}
              className="hover:underline text-indigo-600 dark:text-indigo-400 font-semibold"
            >
              সুপার এডমিন পোর্টাল
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
