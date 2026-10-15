'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ExtractedQuestion, SubjectId } from '@/types';
import { SUBJECTS } from '@/data/subjects';
import {
  Camera,
  Upload,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  Key,
  ExternalLink,
  Edit2,
  Trash2,
  HelpCircle,
  Cpu
} from 'lucide-react';

export function OcrQuestionScanner() {
  const { adminAddExtractedQuestions } = useApp();

  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>('image/jpeg');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [extractedQuestions, setExtractedQuestions] = useState<ExtractedQuestion[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('medhapath_gemini_api_key');
      if (savedKey) {
        setApiKey(savedKey);
      } else {
        setShowApiKeyInput(true); // prompt user to enter key
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    const clean = key.trim();
    setApiKey(clean);
    try {
      localStorage.setItem('medhapath_gemini_api_key', clean);
    } catch {
      // ignore
    }
    if (clean) setShowApiKeyInput(false);
  };

  // Handle image upload from file or camera
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMsg(null);
      setSaveSuccessMsg(null);
      setSelectedMimeType(file.type || 'image/jpeg');

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        // Automatically start real AI scanning
        performRealAiScan(base64, file.type || 'image/jpeg');
      };
      reader.readAsDataURL(file);
    }
  };

  // Perform Real AI Multimodal Vision Scan with Gemini
  const performRealAiScan = async (base64Img: string, mime: string) => {
    setIsScanning(true);
    setScanStep('ছবি আপলোড ও ফ্রেম প্রসেসিং চলছে...');
    setErrorMsg(null);
    setSaveSuccessMsg(null);
    setExtractedQuestions([]);

    try {
      const stepTimer1 = setTimeout(() => {
        setScanStep('জেমিনাই ভিশন এআই দিয়ে বাংলা ও ইংরেজি টেক্সট নির্ভুলভাবে রিড করা হচ্ছে...');
      }, 700);

      const stepTimer2 = setTimeout(() => {
        setScanStep('প্রতিটি প্রশ্ন, অপশন ও সঠিক উত্তরের বিশদ ব্যাখ্যা সাজানো হচ্ছে...');
      }, 2000);

      const response = await fetch('/api/ocr/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Img,
          mimeType: mime,
          apiKey: apiKey || undefined
        })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'NO_API_KEY') {
          setShowApiKeyInput(true);
          throw new Error(data.message || 'গুগল জেমিনাই এপিআই কী দেওয়া হয়নি।');
        }
        throw new Error(data.message || 'ইমেজ স্ক্যানিং করতে ব্যর্থ হয়েছে।');
      }

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setExtractedQuestions(data.questions);
        setSaveSuccessMsg(`🎯 অসাধারণ! আপনার ছবি থেকে মোট ${data.questions.length}টি প্রশ্ন নির্ভুলভাবে সনাক্ত করা হয়েছে!`);
      } else {
        throw new Error('ছবিতে কোনো প্রশ্ন সনাক্ত করা যায়নি। অনুগ্রহ করে পরিষ্কার ও সোজা ছবি দিন।');
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'স্ক্যান করতে সমস্যা হয়েছে। অনুগ্রহ করে আপনার এপিআই কী ও ছবি যাচাই করুন।');
    } finally {
      setIsScanning(false);
      setScanStep('');
    }
  };

  const toggleSelectQuestion = (id: string) => {
    setExtractedQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, selected: !q.selected } : q))
    );
  };

  const updateQuestionCategory = (id: string, newSubject: SubjectId) => {
    setExtractedQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, subjectId: newSubject } : q))
    );
  };

  const updateQuestionOption = (qId: string, optIdx: number, val: string) => {
    setExtractedQuestions(prev =>
      prev.map(q => {
        if (q.id !== qId) return q;
        const newOpts = [...q.options];
        newOpts[optIdx] = val;
        return { ...q, options: newOpts };
      })
    );
  };

  const updateCorrectAnswer = (qId: string, correctIdx: number) => {
    setExtractedQuestions(prev =>
      prev.map(q => (q.id === qId ? { ...q, correctAnswer: correctIdx } : q))
    );
  };

  const deleteExtractedQuestion = (id: string) => {
    setExtractedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleSaveToDatabase = () => {
    const selected = extractedQuestions.filter(q => q.selected !== false);
    if (selected.length === 0) {
      alert('অনুগ্রহ করে অন্তত একটি প্রশ্ন সিলেক্ট করুন!');
      return;
    }

    const payload = selected.map(q => ({
      subjectId: q.subjectId,
      topic: q.topic || 'সাধারণ',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || 'সঠিক উত্তরের বিশদ ব্যাখ্যা।',
      examSource: q.examSource || 'ছবি থেকে স্ক্যানকৃত',
      year: q.year || 2025,
      difficulty: 'medium' as const,
      tags: [...q.tags, 'Gemini_Vision']
    }));

    const addedCount = adminAddExtractedQuestions(payload);
    setSaveSuccessMsg(`✅ সফল হয়েছে! ${addedCount}টি প্রশ্ন সরাসরি প্ল্যাটফর্মের ডাটাবেসে যুক্ত হয়েছে!`);
    setExtractedQuestions([]);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>গুগল জেমিনাই ভিশন এআই ইঞ্জিন (Gemini Vision OCR)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            ছবি থেকে রিয়েল প্রশ্ন স্ক্যানার ও ডাটাবেস আপডেট
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ১৭টি বা যেকোনো সংখ্যক প্রশ্নের ছবি তুলুন। জেমিনাই ভিশন স্বয়ংক্রিয়ভাবে ছবি পড়ে প্রতিটি প্রশ্ন, ৪টি অপশন, সঠিক উত্তর ও ব্যাখ্যা বের করে ক্যাটাগরি অনুযায়ী সাজিয়ে দেবে।
          </p>
        </div>

        {/* API Key Toggle Button */}
        <button
          type="button"
          onClick={() => setShowApiKeyInput(!showApiKeyInput)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition shrink-0"
        >
          <Key className="w-3.5 h-3.5 text-amber-500" />
          <span>{apiKey ? '✓ জেমিনাই এপিআই কী সক্রিয়' : '⚠️ এপিআই কী সেট করুন'}</span>
        </button>
      </div>

      {/* API Key Input Banner if needed */}
      {showApiKeyInput && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 space-y-3 animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>সর্বোচ্চ নির্ভুল বাংলা ও ইংরেজি স্ক্যানিংয়ের জন্য গুগল জেমিনাই এপিআই কী দিন</span>
              </h4>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                গুগল এআই স্টুডিও থেকে সম্পূর্ণ ফ্রিতে ১ মিনিটে পার্সোনাল এপিআই কী তৈরি করতে পারেন।
              </p>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>ফ্রি কী নিন</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex gap-2">
            <input
              type="password"
              placeholder="আপনার Gemini API Key এখানে পেস্ট করুন (AIzaSy...)"
              value={apiKey}
              onChange={e => handleSaveApiKey(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
            <button
              type="button"
              onClick={() => handleSaveApiKey(apiKey)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shrink-0"
            >
              সেভ করুন
            </button>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs md:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs md:text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Image Upload & Camera Box */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-6 sm:p-8 text-center hover:border-emerald-500 transition bg-slate-50/60 dark:bg-slate-800/20 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
        {selectedImage ? (
          <div className="relative w-full flex flex-col items-center justify-center">
            <img
              src={selectedImage}
              alt="Uploaded Question Paper"
              className="max-h-72 rounded-2xl object-contain shadow-lg border border-slate-200 dark:border-slate-700 mb-4"
            />

            {/* Live Scanning Hologram / Laser Bar */}
            {isScanning && (
              <div className="w-full max-w-md p-4 rounded-2xl bg-slate-900/90 text-white backdrop-blur-md shadow-2xl space-y-2 border border-emerald-500/50 animate-pulse">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    <span>জেমিনাই ভিশন এআই প্রসেসিং...</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">{scanStep}</p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full w-full animate-progress" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              যে কোনো প্রশ্নপত্রের স্পষ্ট ছবি আপলোড বা ক্যামেরা দিয়ে তুলুন
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              বাংলা, ইংরেজি, গণিত বা সাধারণ জ্ঞানের একাধিক প্রশ্ন সম্বলিত যেকোনো সাইজের ছবি দিন। এআই নিজে থেকেই পুরো পাতা পড়ে প্রতিটি প্রশ্ন আলাদা করে নেবে।
            </p>
          </div>
        )}

        {/* Action Upload Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>{selectedImage ? 'অন্য ছবি দিন' : 'ছবি নির্বাচন করুন'}</span>
            <input
              type="file"
              accept="image/*"
              disabled={isScanning}
              onChange={handleImageFileChange}
              className="hidden"
            />
          </label>

          <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span>সরাসরি ছবি তুলুন</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              disabled={isScanning}
              onChange={handleImageFileChange}
              className="hidden"
            />
          </label>

          {selectedImage && !isScanning && (
            <button
              type="button"
              onClick={() => performRealAiScan(selectedImage, selectedMimeType)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>পুনরায় স্ক্যান করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Extracted Questions Review & Save Section */}
      {extractedQuestions.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  ছবি থেকে সনাক্তকৃত প্রশ্নসমূহ
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">
                  মোট {extractedQuestions.length} টি প্রশ্ন পাওয়া গেছে
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                প্রতিটি প্রশ্নের টেক্সট, সঠিক উত্তর ও ক্যাটাগরি প্রয়োজন হলে এডিট করে নিন, এরপর ডাটাবেসে সেভ করুন।
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveToDatabase}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 shrink-0"
            >
              <Check className="w-4 h-4" />
              <span>সবগুলো ({extractedQuestions.length}টি) প্রশ্ন ডাটাবেজে যুক্ত করুন</span>
            </button>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {extractedQuestions.map((q, idx) => {
              const isSelected = q.selected !== false;
              const optionLetters = ['ক', 'খ', 'গ', 'ঘ'];

              return (
                <div
                  key={q.id}
                  className={`p-5 md:p-6 rounded-2xl border-2 transition ${
                    isSelected
                      ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  {/* Top Bar: Selector, Question Number, Category & Delete */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectQuestion(q.id)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        প্রশ্ন #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        {q.confidence}% নির্ভুলতা
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-semibold">ক্যাটাগরি:</span>
                      <select
                        value={q.subjectId}
                        onChange={e => updateQuestionCategory(q.id, e.target.value as SubjectId)}
                        className="px-2.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        {SUBJECTS.map(s => (
                          <option key={s.id} value={s.id}>{s.nameBangla}</option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => deleteExtractedQuestion(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        title="বাতিল করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Statement */}
                  <div className="mb-4">
                    <textarea
                      rows={2}
                      value={q.question}
                      onChange={e => {
                        const val = e.target.value;
                        setExtractedQuestions(prev =>
                          prev.map(item => (item.id === q.id ? { ...item, question: val } : item))
                        );
                      }}
                      className="w-full p-2.5 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* 4 Options with Radio to mark correct answer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border transition ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                              : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={isCorrect}
                            onChange={() => updateCorrectAnswer(q.id, oIdx)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            title="সঠিক উত্তর হিসেবে চিহ্নিত করুন"
                          />
                          <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold shrink-0">
                            {optionLetters[oIdx]}
                          </span>
                          <input
                            type="text"
                            value={opt}
                            onChange={e => updateQuestionOption(q.id, oIdx, e.target.value)}
                            className="flex-1 bg-transparent border-none text-xs focus:outline-none font-medium"
                          />
                          {isCorrect && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-auto shrink-0">
                              ✓ সঠিক
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Field */}
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>বিশদ শর্টকাট ব্যাখ্যা ও ট্রিকস:</span>
                    </div>
                    <textarea
                      rows={2}
                      value={q.explanation}
                      onChange={e => {
                        const val = e.target.value;
                        setExtractedQuestions(prev =>
                          prev.map(item => (item.id === q.id ? { ...item, explanation: val } : item))
                        );
                      }}
                      className="w-full p-2 text-xs rounded-lg border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSaveToDatabase}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>সবগুলো ({extractedQuestions.length}টি) প্রশ্ন ডাটাবেজে যুক্ত করুন</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
