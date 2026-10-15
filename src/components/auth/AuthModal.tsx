'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { loginCandidate, registerCandidate, usersList } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Login form
  const [loginIdentifier, setLoginIdentifier] = useState<string>('khairul@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('password123');

  // Register form
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regTargetExam, setRegTargetExam] = useState<string>('৪৭তম বিসিএস প্রিলিমিনারি');

  // Feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const res = loginCandidate(loginIdentifier, loginPassword);
      if (res.success) {
        setSuccessMsg(res.message || 'লগইন সফল হয়েছে!');
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1000);
      } else {
        setErrorMsg(res.message || 'লগইন ব্যর্থ হয়েছে!');
      }
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMsg('অনুগ্রহ করে নাম, ইমেইল ও পাসওয়ার্ড প্রদান করুন!');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = registerCandidate({
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        targetExam: regTargetExam
      });

      if (res.success) {
        setSuccessMsg(res.message || 'নিবন্ধন সফল হয়েছে!');
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1200);
      } else {
        setErrorMsg(res.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে!');
      }
    }, 700);
  };

  const handleQuickDemoUser = (userEmail: string) => {
    setLoginIdentifier(userEmail);
    setLoginPassword('password123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/10">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? 'পরীক্ষার্থী লগইন' : 'নতুন একাউন্ট নিবন্ধন'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            আপনার প্রস্তুতি, স্ট্রিক ও ফলাফল ক্লাউডে সুরক্ষিত রাখুন
          </p>

          {/* Switch Tab */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-4">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              লগইন করুন
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              নতুন একাউন্ট খুলুন
            </button>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ইমেইল অথবা মোবাইল নম্বর
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: candidate@gmail.com"
                  value={loginIdentifier}
                  onChange={e => setLoginIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="আপনার পাসওয়ার্ড..."
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold shadow-md shadow-emerald-600/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>লগইন হচ্ছে...</span>
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Candidates Selector */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-2 font-semibold">
                দ্রুত টেস্ট করতে ডেমো একাউন্ট নির্বাচন করুন:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'খায়রুল ইসলাম', email: 'khairul@gmail.com' },
                  { name: 'তানভীর (PRO)', email: 'tanveer.bcs@gmail.com' },
                  { name: 'ফারহানা (PRO)', email: 'farhana.toma@yahoo.com' },
                ].map(item => (
                  <button
                    key={item.email}
                    type="button"
                    onClick={() => handleQuickDemoUser(item.email)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                পূর্ণ নাম
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো: আরিফুল ইসলাম"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ইমেইল এড্রেস
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="candidate@example.com"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                মোবাইল নম্বর (ঐচ্ছিক)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="০১৭xxxxxxxx"
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                লক্ষ্য / টার্গেট পরীক্ষা
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={regTargetExam}
                  onChange={e => setRegTargetExam(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
                >
                  <option value="৪৭তম বিসিএস প্রিলিমিনারি">৪৭তম বিসিএস প্রিলিমিনারি</option>
                  <option value="কম্বাইন্ড ৮ ব্যাংক অফিসার">কম্বাইন্ড ৮ ব্যাংক অফিসার</option>
                  <option value="প্রাথমিক সহকারী শিক্ষক নিয়োগ ২০২৬">প্রাথমিক সহকারী শিক্ষক নিয়োগ ২০২৬</option>
                  <option value="১৮তম এনটিআরসিএ শিক্ষক নিবন্ধন">১৮তম এনটিআরসিএ শিক্ষক নিবন্ধন</option>
                  <option value="১০ম-২০তম গ্রেড সরকারি চাকরি">১০ম-২০তম গ্রেড সরকারি চাকরি</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="পাসওয়ার্ড নির্ধারণ করুন"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold shadow-md shadow-emerald-600/20 transition disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span> : <span>একাউন্ট তৈরি করুন</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
