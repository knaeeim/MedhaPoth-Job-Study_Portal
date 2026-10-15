'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Flame,
  Zap,
  Crown,
  Shield,
  BookOpen,
  Layers,
  Trophy,
  Shuffle,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LogIn,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  onOpenRandomModal: () => void;
  onOpenSubscriptionModal: () => void;
  onOpenAuthModal: () => void;
}

export function Navbar({
  onOpenRandomModal,
  onOpenSubscriptionModal,
  onOpenAuthModal
}: NavbarProps) {
  const {
    activeView,
    setActiveView,
    currentUser,
    logoutCandidate,
    isSuperAdminLoggedIn
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'home', label: 'হোম', icon: BookOpen },
    { id: 'subjects', label: 'বিষয় ও গেম', icon: Layers },
    { id: 'revision', label: 'স্মার্ট রিভিশন', icon: RotateCcw },
    { id: 'past-exams', label: 'প্রশ্ন ব্যাংক', icon: BookOpen },
    { id: 'leaderboard', label: 'লিডারবোর্ড', icon: Trophy },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-slate-100 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. BRAND LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group transition"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    মেধাপথ
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 hidden sm:inline -mt-0.5">
                  চাকরি প্রস্তুতি প্ল্যাটফর্ম
                </span>
              </div>
            </button>
          </div>

          {/* 2. CENTER PILL NAVIGATION (Segmented Control Style) */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-xl">
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-800/80 border border-slate-700/60 shadow-inner">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 text-emerald-400 font-bold shadow-sm border border-slate-700'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. RIGHT SECTION: STATS, ACTIONS & PROFILE */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Unified Streak & XP Chip */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-200"
              title={`${currentUser?.streak || 0} দিন স্ট্রিক • ${currentUser?.xp || 0} অর্জিত এক্সপি`}
            >
              <div className="flex items-center gap-1 text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-amber-400 animate-pulse" />
                <span>{currentUser?.streak || 0}</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1 text-cyan-400 font-bold">
                <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                <span>{currentUser?.xp || 0} XP</span>
              </div>
            </div>

            {/* Quick Random Exam Button */}
            <button
              type="button"
              onClick={onOpenRandomModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition whitespace-nowrap"
              title="র্যান্ডম প্রশ্ন নিয়ে পরীক্ষা শুরু করুন"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">র্যান্ডম টেস্ট</span>
            </button>

            {/* Pro Badge / Upgrade */}
            {currentUser?.isPro ? (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold"
                title="সক্রিয় প্রো মেম্বারশিপ"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>PRO</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenSubscriptionModal}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold transition"
                title="প্রো সাবস্ক্রিপশন নিন"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>প্রো নিন</span>
              </button>
            )}

            {/* User Profile Dropdown Pill */}
            <div className="relative">
              {currentUser && currentUser.id !== 'guest' ? (
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition"
                >
                  <span className="text-base">{currentUser.avatar}</span>
                  <span className="hidden md:inline text-xs font-bold text-slate-200 max-w-[85px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>লগইন</span>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-3 z-50 animate-fade-in text-xs text-slate-200">
                  <div className="pb-2.5 border-b border-slate-800 mb-2">
                    <p className="font-bold text-white truncate">
                      {currentUser?.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {currentUser?.email}
                    </p>
                    <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {currentUser?.targetExam}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenAuthModal();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-slate-800 text-slate-300 font-medium transition"
                  >
                    অ্যাকাউন্ট পরিবর্তন করুন
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logoutCandidate();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left py-2 px-2.5 rounded-xl hover:bg-rose-950/40 text-rose-400 font-bold flex items-center gap-1.5 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>লগআউট করুন</span>
                  </button>
                </div>
              )}
            </div>

            {/* Super Admin Subtle Icon Button */}
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activeView === 'admin'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
              title="সুপার এডমিন পোর্টাল"
            >
              <Shield className="w-4 h-4 text-indigo-400" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-xl transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 space-y-1 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => {
                  onOpenRandomModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-400 hover:bg-slate-800/50"
              >
                <Shuffle className="w-4 h-4" />
                <span>র্যান্ডম মডেল টেস্ট দিন</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800/50"
              >
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>সুপার এডমিন পোর্টাল</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
