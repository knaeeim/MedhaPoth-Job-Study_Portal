'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SUBJECTS } from '@/data/subjects';
import { Question, SubjectId, AuthUser } from '@/types';
import { SuperAdminLogin } from './SuperAdminLogin';
import { OcrQuestionScanner } from './OcrQuestionScanner';
import {
  Shield,
  Plus,
  Shuffle,
  Trash2,
  Edit3,
  Database,
  Users,
  CheckCircle2,
  X,
  Search,
  Sparkles,
  Camera,
  Crown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck,
  UserX,
  Flame,
  Zap,
  Play
} from 'lucide-react';

export function AdminDashboard() {
  const {
    isSuperAdminLoggedIn,
    superAdminLogout,
    usersList,
    adminToggleUserPro,
    adminDeleteUser,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    resetQuestions,
    startSetExam
  } = useApp();

  // If not logged in as Super Admin, show Super Admin Login gateway!
  if (!isSuperAdminLoggedIn) {
    return <SuperAdminLogin />;
  }

  const [activeTab, setActiveTab] = useState<'users' | 'ocr' | 'generate' | 'questions'>('users');

  // ================= USERS MANAGEMENT & PAGINATION STATE =================
  const [userSearchQuery, setUserSearchQuery] = useState<string>('');
  const [userFilterRole, setUserFilterRole] = useState<'all' | 'pro' | 'free'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      (u.phone && u.phone.includes(userSearchQuery));

    const matchesPro =
      userFilterRole === 'all'
        ? true
        : userFilterRole === 'pro'
        ? u.isPro
        : !u.isPro;

    return matchesSearch && matchesPro;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ================= EXAM GENERATOR STATE =================
  const [examTitle, setExamTitle] = useState<string>('৪৭তম বিসিএস স্পেশাল মেগা মডেল টেস্ট (অফিসিয়াল)');
  const [examSubject, setExamSubject] = useState<SubjectId | 'all'>('all');
  const [examCount, setExamCount] = useState<number>(10);
  const [examDuration, setExamDuration] = useState<number>(15);
  const [generatedSuccess, setGeneratedSuccess] = useState<string | null>(null);

  // ================= QUESTION BANK CRUD STATE =================
  const [searchQuestionQuery, setSearchQuestionQuery] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // New question form
  const [newSubject, setNewSubject] = useState<SubjectId>('bangla');
  const [newTopic, setNewTopic] = useState<string>('');
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [newSource, setNewSource] = useState<string>('৪৭তম বিসিএস স্পেশাল মডেল');
  const [newYear, setNewYear] = useState<number>(2025);

  const handleGenerateOfficialExam = () => {
    let pool = [...questions];
    if (examSubject !== 'all') {
      pool = pool.filter(q => q.subjectId === examSubject);
    }
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(examCount, shuffled.length));

    setGeneratedSuccess(`✅ সফল হয়েছে! ${selected.length}টি প্রশ্ন নিয়ে "${examTitle}" লাইভ পরীক্ষা লঞ্চ করা হয়েছে!`);
    setTimeout(() => {
      startSetExam(selected, examTitle, examDuration);
    }, 1200);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || newOptions.some(opt => !opt) || !newExplanation) {
      alert('সবগুলো ঘর পূরণ করুন!');
      return;
    }

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, {
        subjectId: newSubject,
        topic: newTopic || 'সাধারণ',
        question: newQuestionText,
        options: newOptions,
        correctAnswer: newCorrectAnswer,
        explanation: newExplanation,
        examSource: newSource,
        year: Number(newYear)
      });
      setEditingQuestion(null);
    } else {
      addQuestion({
        subjectId: newSubject,
        topic: newTopic || 'সাধারণ',
        question: newQuestionText,
        options: newOptions,
        correctAnswer: newCorrectAnswer,
        explanation: newExplanation,
        examSource: newSource,
        year: Number(newYear),
        difficulty: 'medium',
        tags: ['এডমিন সংযুক্ত']
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEdit = (q: Question) => {
    setEditingQuestion(q);
    setNewSubject(q.subjectId);
    setNewTopic(q.topic);
    setNewQuestionText(q.question);
    setNewOptions([...q.options]);
    setNewCorrectAnswer(q.correctAnswer);
    setNewExplanation(q.explanation);
    setNewSource(q.examSource);
    setNewYear(q.year);
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setNewTopic('');
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectAnswer(0);
    setNewExplanation('');
    setEditingQuestion(null);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSub = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuestionQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuestionQuery.toLowerCase()) ||
      q.examSource.toLowerCase().includes(searchQuestionQuery.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Super Admin Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800">
                সুপার এডমিন সুরক্ষিত সেশন
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
              সুপার এডমিন ড্যাশবোর্ড
            </h1>
          </div>
        </div>

        {/* Tab Controls & Logout */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-800 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'users'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>ইউজার তালিকা ({usersList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ocr')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'ocr'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>ছবি থেকে প্রশ্ন স্ক্যান</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('generate')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'generate'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>পরীক্ষা লঞ্চ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'questions'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>প্রশ্নব্যাংক ({questions.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={superAdminLogout}
            className="p-2.5 rounded-xl bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition text-xs font-bold flex items-center gap-1.5"
            title="লগআউট করুন"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: USER MANAGEMENT WITH PAGINATION ================= */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>নিবন্ধিত পরীক্ষার্থী ও ইউজার কন্ট্রোল</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                যেকোনো পরীক্ষার্থীকে সরাসরি ১-ক্লিকে প্রো মেম্বার বানান বা স্ট্যাটাস পরিবর্তন করুন
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setUserFilterRole('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  userFilterRole === 'all'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                সব ইউজার ({usersList.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserFilterRole('pro');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  userFilterRole === 'pro'
                    ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                প্রো ইউজার ({usersList.filter(u => u.isPro).length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserFilterRole('free');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  userFilterRole === 'free'
                    ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                ফ্রি ইউজার ({usersList.filter(u => !u.isPro).length})
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="নাম, ইমেইল অথবা মোবাইল দিয়ে ইউজার খুঁজুন..."
              value={userSearchQuery}
              onChange={e => {
                setUserSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {/* User Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">পরীক্ষার্থী</th>
                  <th className="p-3.5">টার্গেট পরীক্ষা</th>
                  <th className="p-3.5">প্রস্তুতি স্কোর</th>
                  <th className="p-3.5">মেম্বারশিপ স্ট্যাটাস</th>
                  <th className="p-3.5 text-right">এডমিন অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      কোনো পরীক্ষার্থী পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map(candidate => (
                    <tr key={candidate.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{candidate.avatar}</span>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {candidate.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {candidate.email} {candidate.phone && `• ${candidate.phone}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                        {candidate.targetExam}
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-3 font-semibold">
                          <span className="flex items-center gap-1 text-amber-500">
                            <Flame className="w-3.5 h-3.5 fill-amber-500" />
                            {candidate.streak} দিন
                          </span>
                          <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                            <Zap className="w-3.5 h-3.5 fill-indigo-600" />
                            {candidate.xp} XP
                          </span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        {candidate.isPro ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 font-bold text-[11px]">
                            <Crown className="w-3.5 h-3.5" />
                            <span>PRO সদস্য</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
                            ফ্রি মেম্বার
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => adminToggleUserPro(candidate.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 shadow-xs ${
                              candidate.isPro
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                            }`}
                          >
                            {candidate.isPro ? (
                              <>
                                <UserX className="w-3.5 h-3.5" />
                                <span>ফ্রি করুন</span>
                              </>
                            ) : (
                              <>
                                <Crown className="w-3.5 h-3.5" />
                                <span>প্রো বানান</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`আপনি কি ${candidate.name} এর অ্যাকাউন্টটি মুছে ফেলতে চান?`)) {
                                adminDeleteUser(candidate.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-500">
              মোট <b>{filteredUsers.length}</b> জন ব্যবহারকারীর মধ্যে দেখাচ্ছে{' '}
              <b>{(currentPage - 1) * itemsPerPage + 1}</b> -{' '}
              <b>{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</b>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 disabled:opacity-40 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: AI OCR IMAGE QUESTION SCANNER ================= */}
      {activeTab === 'ocr' && <OcrQuestionScanner />}

      {/* ================= TAB 3: OFFICIAL EXAM LAUNCHER ================= */}
      {activeTab === 'generate' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              অফিসিয়াল এক্সাম লঞ্চার
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              ডাটাবেসের প্রশ্ন দিয়ে স্বয়ংক্রিয় পরীক্ষার সেট তৈরি ও লাইভ লঞ্চ
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              এখানে ক্লিক করলে আমাদের সংরক্ষিত ডাটাবেস থেকে র্যান্ডমভাবে বাছাইকৃত প্রশ্ন নিয়ে নতুন পরীক্ষার সেট তৈরি ও সরাসরি পরীক্ষা শুরু হবে।
            </p>
          </div>

          {generatedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{generatedSuccess} লাইভ পরীক্ষায় নিয়ে যাওয়া হচ্ছে...</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                পরীক্ষার শিরোনাম / নাম
              </label>
              <input
                type="text"
                value={examTitle}
                onChange={e => setExamTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                কোন বিষয় থেকে প্রশ্ন নেওয়া হবে?
              </label>
              <select
                value={examSubject}
                onChange={e => setExamSubject(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-semibold"
              >
                <option value="all">🌐 সব বিষয় মিলিয়ে (পূর্ণাঙ্গ বিসিএস মডেল)</option>
                {SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.nameBangla}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                প্রশ্নের সংখ্যা
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setExamCount(count)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      examCount === count
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {count} টি
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                সময় বরাদ্দ (মিনিট)
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map(duration => (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => setExamDuration(duration)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      examDuration === duration
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {duration} মিনিট
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={handleGenerateOfficialExam}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs md:text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
            >
              <Play className="w-4 h-4" />
              <span>🎲 ডাটাবেস থেকে র্যান্ডম প্রশ্ন নিয়ে পরীক্ষা লঞ্চ করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 4: QUESTION BANK MANAGEMENT ================= */}
      {activeTab === 'questions' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="প্রশ্ন খুঁজুন..."
                value={searchQuestionQuery}
                onChange={e => setSearchQuestionQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsAddModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন প্রশ্ন যুক্ত করুন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('আপনি কি ডাটাবেসের ডিফল্ট প্রশ্নে ফিরে যেতে চান?')) {
                    resetQuestions();
                  }
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-50"
              >
                রিসেট
              </button>
            </div>
          </div>

          {/* Questions Table */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[500px] overflow-y-auto">
            {filteredQuestions.map(q => (
              <div key={q.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                      {q.subjectId}
                    </span>
                    <span className="text-xs text-slate-500">{q.topic}</span>
                    <span className="text-xs text-slate-400">• [{q.examSource}]</span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {q.question}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEdit(q)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteQuestion(q.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {editingQuestion ? 'প্রশ্ন সম্পাদনা করুন' : 'ডাটাবেজে নতুন প্রশ্ন যুক্ত করুন'}
            </h3>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বিষয়
                  </label>
                  <select
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.nameBangla}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    টপিক
                  </label>
                  <input
                    type="text"
                    value={newTopic}
                    placeholder="যেমন: সন্ধি, লাভ-ক্ষতি"
                    onChange={e => setNewTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  প্রশ্নটি লিখুন
                </label>
                <textarea
                  rows={2}
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="প্রশ্নের মূল বক্তব্য..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ৪টি অপশন লিখুন এবং সঠিক উত্তরটি নির্বাচন করুন
                </label>
                <div className="space-y-2">
                  {newOptions.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswerRadio"
                        checked={newCorrectAnswer === oIdx}
                        onChange={() => setNewCorrectAnswer(oIdx)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={e => {
                          const updated = [...newOptions];
                          updated[oIdx] = e.target.value;
                          setNewOptions(updated);
                        }}
                        placeholder={`অপশন ${['ক', 'খ', 'গ', 'ঘ'][oIdx]}`}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বিশদ ব্যাখ্যা ও শর্টকাট ট্রিক
                </label>
                <textarea
                  rows={3}
                  value={newExplanation}
                  onChange={e => setNewExplanation(e.target.value)}
                  placeholder="কেন এই উত্তরটি সঠিক? মনে রাখার সহজ নিয়ম..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পরীক্ষার সোর্স
                  </label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={e => setNewSource(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সাল
                  </label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={e => setNewYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
