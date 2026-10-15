'use client';

import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '@/data/plansData';
import { useApp } from '@/context/AppContext';
import { Check, Sparkles, X, Zap, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { user, togglePro } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro_yearly');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      togglePro(true);
      setSuccessMessage('🎉 অভিনন্দন! আপনার প্রো মেম্বারশিপ সক্রিয় হয়েছে!');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>মেধাপথ প্রো এক্সেস</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            বিসিএস ও সরকারি চাকরি প্রস্তুতিতে এগিয়ে থাকুন অন্যদের চেয়ে!
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            র্যান্ডম ফুল মডেল টেস্ট, ১০ম-৪৬তম বিসিএস সমাধান, স্পেসড রেপিটিশন রিভিশন ও এক্সপার্ট ব্যাখ্যা আনলক করুন।
          </p>
        </div>

        {successMessage ? (
          <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <Zap className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">{successMessage}</h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">সবগুলো প্রো ফিচার এখন আপনার জন্য উন্মুক্ত।</p>
          </div>
        ) : (
          <>
            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const isCurrentActive = (plan.id === 'free' && !user.isPro) || (plan.id !== 'free' && user.isPro);

                return (
                  <div
                    key={plan.id}
                    onClick={() => plan.id !== 'free' && setSelectedPlanId(plan.id)}
                    className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 transition cursor-pointer ${
                      plan.popular
                        ? 'border-emerald-500 bg-gradient-to-b from-emerald-50/50 dark:from-emerald-950/20 to-white dark:to-slate-900 shadow-lg'
                        : isSelected
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                        জনপ্রিয় চয়েস 🔥
                      </span>
                    )}

                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{plan.tagline}</p>
                        </div>
                      </div>

                      <div className="mt-4 mb-4">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">৳{plan.price}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400"> /{plan.period}</span>
                        {plan.originalPrice && (
                          <span className="ml-2 text-xs text-slate-400 line-through">৳{plan.originalPrice}</span>
                        )}
                      </div>

                      <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                feat.included
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-slate-300 dark:text-slate-600 line-through'
                              }`}
                            />
                            <span className={feat.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}>
                              {feat.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-2">
                      {isCurrentActive ? (
                        <div className="w-full py-2 text-center text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {plan.id === 'free' ? 'বর্তমান ফ্রি প্ল্যান' : '✓ সক্রিয় প্রো প্ল্যান'}
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-sm ${
                            isSelected
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected ? 'নির্বাচিত' : 'বেছে নিন'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Payment Gateway */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                সহজ পেমেন্ট মেথড (বিকাশ / নগদ / রকেট)
              </h4>

              <div className="flex flex-wrap gap-3 mb-4">
                {[
                  { id: 'bkash', label: 'bKash (বিকাশ)', color: 'bg-pink-600' },
                  { id: 'nagad', label: 'Nagad (নগদ)', color: 'bg-orange-600' },
                  { id: 'rocket', label: 'Rocket (রকেট)', color: 'bg-purple-600' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPaymentMethod(item.id as any)}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition ${
                      paymentMethod === item.id
                        ? 'border-emerald-600 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  🔒 ইনস্ট্যান্ট সিমুলেটেড অ্যাক্টিভেশন • যেকোনো সময় বাতিলযোগ্য
                </div>
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>যাচাই করা হচ্ছে...</span>
                  ) : (
                    <>
                      <span>পেমেন্ট সম্পন্ন করুন ({selectedPlanId === 'pro_monthly' ? '৳৯৯' : '৳৫৯৯'})</span>
                      <Zap className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
