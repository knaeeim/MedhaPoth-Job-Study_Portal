'use client';

import React, { useState, useEffect } from 'react';
import { MatchPair } from '@/types';
import { useApp } from '@/context/AppContext';
import { Gamepad2, Check, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FormulaMatchGameProps {
  pairs: MatchPair[];
  onCompleted?: () => void;
}

export function FormulaMatchGame({ pairs, onCompleted }: FormulaMatchGameProps) {
  const { addXP, addCoins } = useApp();

  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);
  const [shuffledMatches, setShuffledMatches] = useState<MatchPair[]>([]);

  useEffect(() => {
    // Shuffle the right column so it's a real puzzle
    const shuffled = [...pairs].sort(() => 0.5 - Math.random());
    setShuffledMatches(shuffled);
  }, [pairs]);

  const handleTermClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedTermId(id);
    if (selectedMatchId) {
      checkMatch(id, selectedMatchId);
    }
  };

  const handleMatchClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedMatchId(id);
    if (selectedTermId) {
      checkMatch(selectedTermId, id);
    }
  };

  const checkMatch = (termId: string, matchId: string) => {
    if (termId === matchId) {
      // Correct Match!
      const newMatched = [...matchedIds, termId];
      setMatchedIds(newMatched);
      setSelectedTermId(null);
      setSelectedMatchId(null);
      addXP(20);
      addCoins(5);

      if (newMatched.length === pairs.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      // Wrong Match
      setWrongPair(true);
      setTimeout(() => {
        setSelectedTermId(null);
        setSelectedMatchId(null);
        setWrongPair(false);
      }, 700);
    }
  };

  const isAllMatched = matchedIds.length === pairs.length && pairs.length > 0;

  const handleRestart = () => {
    setMatchedIds([]);
    setSelectedTermId(null);
    setSelectedMatchId(null);
    setShuffledMatches([...pairs].sort(() => 0.5 - Math.random()));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ডাবল পেয়ার ম্যাচিং গেম
            </h3>
            <p className="text-xs text-slate-500">
              বাম পাশের পদের সাথে ডান পাশের সঠিক নিয়ম বা ফলাফলটি মেলান
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          মিলেছে: {matchedIds.length} / {pairs.length}
        </span>
      </div>

      {isAllMatched ? (
        <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 animate-fade-in">
          <Trophy className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
            অভিনন্দন! সব জোড়া সঠিকভাবে মিলেছে!
          </h4>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 mb-6">
            আপনি এই গেম থেকে +৮০ XP এবং +২০ কয়েন অর্জন করেছেন।
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-emerald-300 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>আবার খেলুন</span>
            </button>
            {onCompleted && (
              <button
                type="button"
                onClick={onCompleted}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                টপিক সম্পন্ন করুন
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column A: Terms */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              পদ বা প্রশ্ন (কলাম ১)
            </span>
            {pairs.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedTermId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleTermClick(item.id)}
                  className={`w-full p-4 rounded-xl text-left text-xs md:text-sm font-semibold border-2 transition flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 opacity-60 cursor-default'
                      : isSelected
                      ? wrongPair
                        ? 'border-rose-500 bg-rose-50 text-rose-700 animate-shake'
                        : 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{item.term}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Column B: Matches */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              মিলিত অর্থ বা নিয়ম (কলাম ২)
            </span>
            {shuffledMatches.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedMatchId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleMatchClick(item.id)}
                  className={`w-full p-4 rounded-xl text-left text-xs md:text-sm font-semibold border-2 transition flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 opacity-60 cursor-default'
                      : isSelected
                      ? wrongPair
                        ? 'border-rose-500 bg-rose-50 text-rose-700 animate-shake'
                        : 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{item.match}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
