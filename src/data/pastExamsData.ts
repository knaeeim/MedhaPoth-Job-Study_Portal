export interface PastExamSet {
  id: string;
  title: string;
  year: number;
  category: 'bcs' | 'primary' | 'bank' | 'ntrca';
  categoryLabel: string;
  totalQuestions: number;
  durationMinutes: number;
  participants: number;
  difficulty: 'সহজ' | 'মাঝারি' | 'কঠিন';
  description: string;
  tags: string[];
}

export const PAST_EXAMS: PastExamSet[] = [
  {
    id: 'exam-bcs-46',
    title: '৪৬তম বিসিএস প্রিলিমিনারি প্রশ্নপত্র',
    year: 2024,
    category: 'bcs',
    categoryLabel: 'বিসিএস প্রিলিমিনারি',
    totalQuestions: 200,
    durationMinutes: 120,
    participants: 18450,
    difficulty: 'মাঝারি',
    description: '২০২৪ সালের ৪৬তম বিসিএস প্রিলির বাংলা, ইংরেজি, গণিত ও বাংলাদেশ/আন্তর্জাতিক বিষয়ের পূর্ণাঙ্গ প্রশ্ন ও সমাধান।',
    tags: ['BCS 46', 'পিএসসি', 'লেটেস্ট']
  },
  {
    id: 'exam-bcs-45',
    title: '৪৫তম বিসিএস প্রিলিমিনারি প্রশ্নপত্র',
    year: 2023,
    category: 'bcs',
    categoryLabel: 'বিসিএস প্রিলিমিনারি',
    totalQuestions: 200,
    durationMinutes: 120,
    participants: 24300,
    difficulty: 'মাঝারি',
    description: '২০২৩ সালের ৪৫তম বিসিএস প্রিলিমিনারির সকল বিষয়ের নির্ভুল প্রশ্ন-ব্যাখ্যাসহ সমাধান ও মডেল টেস্ট।',
    tags: ['BCS 45', 'পিএসসি']
  },
  {
    id: 'exam-bcs-44',
    title: '৪৪তম বিসিএস প্রিলিমিনারি প্রশ্নপত্র',
    year: 2022,
    category: 'bcs',
    categoryLabel: 'বিসিএস প্রিলিমিনারি',
    totalQuestions: 200,
    durationMinutes: 120,
    participants: 29500,
    difficulty: 'কঠিন',
    description: '৪৪তম বিসিএস প্রিলিমিনারি পরীক্ষার শতভাগ প্রামাণ্য ও টেকনিক্যাল ব্যাখ্যা সংবলিত সমাধান।',
    tags: ['BCS 44', 'পিএসসি']
  },
  {
    id: 'exam-primary-2023',
    title: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ পরীক্ষা (৩য় ধাপ)',
    year: 2023,
    category: 'primary',
    categoryLabel: 'প্রাথমিক শিক্ষক নিয়োগ',
    totalQuestions: 80,
    durationMinutes: 60,
    participants: 31200,
    difficulty: 'সহজ',
    description: 'প্রাথমিক শিক্ষক নিয়োগ পরীক্ষার বাংলা, সাধারণ জ্ঞান ও গণিতের বেসিক প্রশ্ন সংগ্রহ।',
    tags: ['Primary', 'সহকারী শিক্ষক']
  },
  {
    id: 'exam-bank-senior-2022',
    title: 'কম্বাইন্ড ৮ ব্যাংক সিনিয়র অফিসার পরীক্ষা',
    year: 2022,
    category: 'bank',
    categoryLabel: 'ব্যাংকার্স সিলেকশন কমিটি (BSEC)',
    totalQuestions: 100,
    durationMinutes: 60,
    participants: 16700,
    difficulty: 'কঠিন',
    description: 'বাংলাদেশ ব্যাংক ব্যাংকার্স সিলেকশন কমিটির অধীন ৮ ব্যাংকের সিনিয়র অফিসার পদের প্রশ্ন।',
    tags: ['Bank', 'Senior Officer', 'Math Focused']
  },
  {
    id: 'exam-ntrca-18th',
    title: '১৮তম এনটিআরসিএ (NTRCA) প্রিলিমিনারি',
    year: 2024,
    category: 'ntrca',
    categoryLabel: 'শিক্ষক নিবন্ধন (NTRCA)',
    totalQuestions: 100,
    durationMinutes: 60,
    participants: 21900,
    difficulty: 'মাঝারি',
    description: '১৮তম শিক্ষক নিবন্ধন প্রিলিমিনারির স্কুল ও কলেজ পর্যায়ের প্রশ্নব্যাংক।',
    tags: ['NTRCA', 'নিবন্ধন']
  }
];
