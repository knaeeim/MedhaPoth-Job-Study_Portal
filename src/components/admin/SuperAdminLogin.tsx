'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, Lock, User, AlertCircle, CheckCircle2, ArrowRight, KeyRound } from 'lucide-react';

export function SuperAdminLogin() {
  const { superAdminLogin, setActiveView } = useApp();

  const [adminId, setAdminId] = useState<string>('admin');
  const [adminPassword, setAdminPassword] = useState<string>('admin123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const res = superAdminLogin(adminId, adminPassword);
      if (!res.success) {
        setErrorMsg(res.message || 'ভুল আইডি বা পাসওয়ার্ড!');
      }
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-slate-800 text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-lg border border-slate-700">
            <Shield className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-bold">
            রেস্ট্রিক্টেড এক্সেস
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            সুপার এডমিন পোর্টাল
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            প্ল্যাটফর্ম নিয়ন্ত্রণ, ইউজার ম্যানেজমেন্ট ও প্রশ্ন আপডেটের জন্য লগইন করুন
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              এডমিন ইউজার আইডি
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={adminId}
                onChange={e => setAdminId(e.target.value)}
                placeholder="যেমন: admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              এডমিন পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                placeholder="পাসওয়ার্ড দিন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>ডিফল্ট ক্রেডেনশিয়াল: আইডি <b>admin</b> | পাসওয়ার্ড <b>admin123</b></span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs md:text-sm font-bold shadow-lg shadow-slate-900/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>যাচাই করা হচ্ছে...</span>
            ) : (
              <>
                <span>এডমিন প্যানেলে প্রবেশ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveView('home')}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition"
          >
            ← মূল সাইটে ফিরে যান
          </button>
        </form>
      </div>
    </div>
  );
}
