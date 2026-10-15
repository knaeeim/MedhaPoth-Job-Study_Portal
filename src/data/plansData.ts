export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  period: string;
  popular?: boolean;
  features: { title: string; included: boolean }[];
  ctaText: string;
}

export const SUBSCRIPTION_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'ফ্রি প্ল্যান',
    tagline: 'বেসিক প্রস্তুতির জন্য উপযোগী',
    price: 0,
    period: 'আজীবন',
    features: [
      { title: 'প্রতিদিন সর্বোচ্চ ৩টি কুইজ ও গেম', included: true },
      { title: 'সীমিত কোশ্চেন ব্যাংক অ্যাক্সেস', included: true },
      { title: 'সাধারণ লিডারবোর্ড র‍্যাঙ্কিং', included: true },
      { title: 'স্পেসড রেপিটিশন রিভিশন ডেক', included: false },
      { title: 'র্যান্ডম আনলিমিটেড ফুল মক টেস্ট', included: false },
      { title: '১০ম-৪৬তম বিসিএস আর্কাইভ পিডিএফ ও ব্যাখ্যা', included: false },
      { title: 'দুর্বল টপিক ডিটেকশন ও পারফরম্যান্স গ্রাফ', included: false },
    ],
    ctaText: 'বর্তমান প্ল্যান'
  },
  {
    id: 'pro_monthly',
    name: 'প্রো মান্থলি',
    tagline: 'পরীক্ষার আগের মাসের চূড়ান্ত প্রস্তুতি',
    price: 99,
    originalPrice: 199,
    period: 'প্রতি মাস',
    features: [
      { title: 'আনলিমিটেড গেম, ফ্ল্যাশ কার্ড ও প্র্যাকটিস', included: true },
      { title: '১০ম-৪৬তম বিসিএস ও সকল ব্যাংকের প্রশ্নব্যাংক', included: true },
      { title: '১-ক্লিকে র্যান্ডম প্রশ্ন দিয়ে কাস্টম টেস্ট তৈরি', included: true },
      { title: 'স্মার্ট স্পেসড রেপিটিশন (ভুল উত্তরের রিভিশন)', included: true },
      { title: 'নেগেটিভ মার্কিং সহ ফুল মডেল টেস্ট টাইমার', included: true },
      { title: 'প্রতিটি প্রশ্নের বিষদ শর্টকাট ব্যাখ্যা ও ট্রিকস', included: true },
      { title: 'উইকলি মেগা লিডারবোর্ড পুরষ্কার প্রতিযোগিতা', included: true },
    ],
    ctaText: '৯৯ টাকায় প্রো নিন'
  },
  {
    id: 'pro_yearly',
    name: 'প্রো বাৎসরিক (সেরা ভ্যালু)',
    tagline: 'সম্পূর্ণ ১ বছরের অবিচ্ছিন্ন বিসিএস ও চাকরি গাইড',
    price: 599,
    originalPrice: 1199,
    period: '১ বছর',
    popular: true,
    features: [
      { title: 'প্রো মান্থলির সকল সুবিধা অন্তর্ভুক্ত', included: true },
      { title: 'অফলাইন পড়ার জন্য সম্পূর্ণ নোট ও পিডিএফ ডাউনলোড', included: true },
      { title: 'টপিকভিত্তিক উইকলি এক্সপার্ট মক টেস্ট লাইভ', included: true },
      { title: 'কাস্টম পার্সোনালাইজড স্টাডি রুটিন', included: true },
      { title: 'প্রো ব্যাজ এবং ডাবল এক্সপি (2x XP) আর্নিং', included: true },
      { title: '২৪/৭ ডাউট সলভিং ও সাপোর্ট', included: true },
    ],
    ctaText: '৫৯৯ টাকায় বাৎসরিক মেম্বারশিপ'
  }
];
