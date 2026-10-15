import { LessonTopic } from '@/types';

export const LESSON_TOPICS: LessonTopic[] = [
  // ================= BANGLA LESSONS =================
  {
    id: 'bangla-sandhi',
    subjectId: 'bangla',
    title: 'সন্ধি ও বর্ণ প্রকরণ (মাস্টারক্লাস)',
    slug: 'sandhi-and-phonetics',
    badge: 'সবচেয়ে বেশি আসা টপিক',
    description: 'স্বরসন্ধি, ব্যঞ্জনসন্ধি ও বিসর্গ সন্ধির সহজ জাদুকরী নিয়মাবলী ও ব্যতিক্রমী উদাহরণ।',
    prerequisiteConcepts: [
      {
        title: 'সন্ধি কী এবং কেন গুরুত্বপূর্ণ?',
        summary: 'পাশাপাশি দুটি বর্ণের মিলনকে সন্ধি বলে। এটি উচ্চারণের সুবিধা ও শ্রুতিমধুরতার জন্য ব্যবহৃত হয়। বিসিএস ও চাকরির পরীক্ষায় ব্যঞ্জনসন্ধি ও নিপাতনে সিদ্ধ সন্ধি থেকে সবচেয়ে বেশি প্রশ্ন আসে।',
        keyPoints: [
          'স্বরবর্ণ + স্বরবর্ণ = স্বরসন্ধি (যেমন: বিদ্যা + আলয় = বিদ্যালয়)',
          'স্বর + ব্যঞ্জন বা ব্যঞ্জন + ব্যঞ্জন = ব্যঞ্জনসন্ধি (যেমন: দিক্ + অন্ত = দিগন্ত)',
          'বিসর্গ (ঃ) এর সাথে স্বর বা ব্যঞ্জনের মিলন = বিসর্গ সন্ধি (যেমন: মনঃ + কষ্ট = মনঃকষ্ট)',
          'কোনো নিয়ম মানে না যা = নিপাতনে সিদ্ধ সন্ধি (যেমন: গো + অক্ষ = গবাক্ষ)'
        ],
        formulaOrRule: 'মাস্টার রুল: বর্গের ১ম ধ্বনির পর স্বরধ্বনি থাকলে তা বর্গের ৩য় ধ্বনিতে রূপ নেয় (ক->গ, চ->জ, ত->দ, প->ব)। যেমন: দিক্ + অন্ত = দিগন্ত।',
        commonTrap: 'সতর্কতা: "পদ্ধতি" (পদ + হতি), "উদ্ধৃত" (উৎ + হৃত) - এখানে \'হ\' থাকার কারণে \'দ্ধ\' হয়েছে, অনেকেই ভুল করে \'পদ্ + ধতি\' দাগায়।',
        example: {
          q: '‘ষড়ঋতু’ এর সঠিক সন্ধি বিচ্ছেদ কোনটি?',
          a: 'ষট্ + ঋতু = ষড়ঋতু',
          note: 'ট্-এর পর স্বরধ্বনি থাকায় ট্ রূপান্তরিত হয়ে ড্/ড়্ হয়েছে।'
        }
      },
      {
        title: 'নিপাতনে সিদ্ধ সন্ধি সহজে মনে রাখার টেকনিক',
        summary: 'যে সন্ধি ব্যাকরণের সাধারণ কোনো নিয়ম অনুসরণ করে না, তাকে নিপাতনে সিদ্ধ সন্ধি বলে। পরীক্ষায় এগুলো সরাসরি মুখস্থভিত্তিক আসে।',
        keyPoints: [
          'গবাক্ষ = গো + অক্ষ (গো + অক্ষ = গোক্ষ হওয়ার কথা কিন্তু হয়েছে গবাক্ষ)',
          'বনস্পতি = বন + পতি',
          'বৃহস্পতি = বৃহৎ + পতি',
          'তস্কর = তৎ + কর',
          'পরস্পর = পর + পর'
        ],
        formulaOrRule: 'ছন্দ টেকনিক: "গোলাপের গবাক্ষ দিয়ে বনস্পতি ও বৃহস্পতি পরস্পরকে দেখে আশ্চর্য হলো।"'
      }
    ],
    flashcards: [
      {
        id: 'fc-b1',
        front: '‘পদ্ধতি’ এর সন্ধি বিচ্ছেদ কী?',
        back: 'পদ + হতি',
        hint: 'ত্/দ্ + হ = দ্ধ নিয়মের প্রয়োগ'
      },
      {
        id: 'fc-b2',
        front: '‘দিগন্ত’ শব্দের সন্ধি বিচ্ছেদ কী?',
        back: 'দিক্ + অন্ত',
        hint: '১ম ধ্বনি ৩য় ধ্বনিতে রূপান্তরিত হয় (ক -> গ)'
      },
      {
        id: 'fc-b3',
        front: '‘গবাক্ষ’ কোন ধরণের সন্ধি?',
        back: 'নিপাতনে সিদ্ধ স্বরসন্ধি (গো + অক্ষ)',
        hint: 'সাধারণ নিয়ম মানে না'
      },
      {
        id: 'fc-b4',
        front: '‘উচ্ছ্বাস’ এর সঠিক সন্ধি বিচ্ছেদ কী?',
        back: 'উৎ + শ্বাস',
        hint: 'ত্ + শ = চ্ছ'
      }
    ],
    matchGameItems: [
      { id: 'm1', term: 'দিক্ + অন্ত', match: 'দিগন্ত' },
      { id: 'm2', term: 'পদ + হতি', match: 'পদ্ধতি' },
      { id: 'm3', term: 'গো + অক্ষ', match: 'গবাক্ষ' },
      { id: 'm4', term: 'বৃহৎ + পতি', match: 'বৃহস্পতি' }
    ],
    miniQuizQuestionIds: ['b-01', 'b-06']
  },

  {
    id: 'bangla-samash',
    subjectId: 'bangla',
    title: 'সমাস ও তার শ্রেণীবিন্যাস',
    slug: 'samash-classification',
    badge: 'কনসেপ্ট ট্রিকস',
    description: 'দ্বন্দ্ব, কর্মধারয়, তৎপুরুষ, বহুব্রীহি, দ্বিগু ও অব্যয়ীভাব সমাস চেনার শর্টকাট।',
    prerequisiteConcepts: [
      {
        title: 'সমাসের অর্থপ্রধান ট্রিকস (কোন পদের অর্থ প্রধান?)',
        summary: 'সমাস মানে সংক্ষেপ বা একাধিক পদের একপদীকরণ। কোন পদের অর্থ প্রধান—এই একটি ট্রিক দিয়ে ৮০% সমাস সমাধান করা যায়।',
        keyPoints: [
          'উভয় পদ প্রধান = দ্বন্দ্ব সমাস (মা ও বাবা = মা-বাবা)',
          'পরপদ প্রধান = কর্মধারয়, তৎপুরুষ, দ্বিগু (যেমন: সিংহাসন, বিলাতফেরত, চৌরাস্তা)',
          'পূর্বপদ প্রধান = অব্যয়ীভাব সমাস (উপকণ্ঠ, প্রতিদিন)',
          'অন্য পদ প্রধান (কোনো পদের অর্থই না বুঝিয়ে নতুন অর্থ) = বহুব্রীহি সমাস (পীতাম্বর = শ্রীকৃষ্ণ, দশানন = রাবণ)'
        ],
        formulaOrRule: 'শর্টকাট ছন্দ: "দ্বন্দ্ব-এ উভয় পদ, বহুব্রীহিতে নতুন কেউ রয় / কর্মধারয়-তৎপুরুষ-দ্বিগু-তে পরপদের জয় / অব্যয়ীভাবে পূর্বপদে অব্যয় যুক্ত হয়।"'
      }
    ],
    flashcards: [
      { id: 'fc-s1', front: '‘উপকণ্ঠ’ কোন সমাস?', back: 'অব্যয়ীভাব (কণ্ঠের সমীপে)', hint: 'উপ অব্যয় সামীপ্য অর্থে' },
      { id: 'fc-s2', front: '‘পীতাম্বর’ কোন সমাস?', back: 'বহুব্রীহি (পীত অম্বর যার - শ্রীকৃষ্ণ)', hint: 'তৃতীয় ব্যক্তি বুঝায়' },
      { id: 'fc-s3', front: '‘সিংহাসন’ কোন সমাস?', back: 'মধ্যপদলোপী কর্মধারয় (সিংহ চিহ্নিত আসন)', hint: 'চিহ্নিত শব্দটি লোপ পেয়েছে' },
      { id: 'fc-s4', front: '‘দম্পতি’ কোন সমাস?', back: 'দ্বন্দ্ব সমাস (জায়া ও পতি)', hint: 'উভয় পদের অর্থ প্রধান' }
    ],
    matchGameItems: [
      { id: 'ms1', term: 'মা ও বাবা', match: 'দ্বন্দ্ব সমাস' },
      { id: 'ms2', term: 'সিংহ চিহ্নিত আসন', match: 'মধ্যপদলোপী কর্মধারয়' },
      { id: 'ms3', term: 'কণ্ঠের সমীপে (উপকণ্ঠ)', match: 'অব্যয়ীভাব সমাস' },
      { id: 'ms4', term: 'দশ আনন যার (দশানন)', match: 'বহুব্রীহি সমাস' }
    ],
    miniQuizQuestionIds: ['b-02', 'b-04']
  },

  // ================= ENGLISH LESSONS =================
  {
    id: 'english-subject-verb',
    subjectId: 'english',
    title: 'Subject-Verb Agreement (Master Rules)',
    slug: 'subject-verb-agreement',
    badge: 'বিসিএস ও ব্যাংক স্পেশাল',
    description: 'Subject অনুযায়ী সঠিক Verb নির্বাচন করার ১০টি গোল্ডেন রুলস ও এক্সেপশন।',
    prerequisiteConcepts: [
      {
        title: 'Golden Rule: Singular Subject = Singular Verb',
        summary: 'বাক্যের Subject যদি Singular হয় তবে Verb-ও Singular হবে; Subject Plural হলে Verb-ও Plural হবে। তবে বিভ্রান্তিকর কিছু বিশেষ নিয়ম পরীক্ষায় প্রায়ই আসে।',
        keyPoints: [
          'Each, Every, Either, Neither, One of, Anyone + Plural Noun থাকলে Verb সর্বদা SINGULAR হবে।',
          'As well as, with, along with, together with, accompanied by দ্বারা দুটি Subject যুক্ত থাকলে ১ম Subject অনুযায়ী Verb বসে।',
          'Either...or, Neither...nor, Not only...but also দ্বারা যুক্ত থাকলে ২য় Subject (নিকটবর্তী Subject) অনুযায়ী Verb বসে।'
        ],
        formulaOrRule: 'শর্টকাট ট্রিক: "As well as" দেখলে ১ম সাবজেক্ট খোঁজো; "Neither...nor" দেখলে শেষের সাবজেক্টটি খোঁজো!',
        commonTrap: 'Neither of the boys (has/have)? উত্তর হবে has! কারণ মূল কর্তা boys নয়, Neither (একক)।',
        example: {
          q: 'The captain, along with his teammates, ___ present.',
          a: 'was (not were)',
          note: 'কারণ "along with" এর পূর্বের Subject হলো "The captain" (Singular)।'
        }
      }
    ],
    flashcards: [
      { id: 'fc-e1', front: 'Neither of the students (has/have) come.', back: 'has (Always singular with "Neither of")', hint: 'Neither represents singular' },
      { id: 'fc-e2', front: 'Rahim as well as his friends (is/are) invited.', back: 'is (Follows 1st subject "Rahim")', hint: 'as well as focuses on 1st subject' },
      { id: 'fc-e3', front: 'Either he or I (am/is/are) mistaken.', back: 'am (Follows closest subject "I")', hint: 'Or / Nor matches the nearest subject' },
      { id: 'fc-e4', front: 'Ten miles (is/are) a long distance.', back: 'is (Collective quantity/distance takes singular verb)', hint: 'Distance taken as single unit' }
    ],
    matchGameItems: [
      { id: 'me1', term: 'One of the boys', match: 'Takes Singular Verb (has/is)' },
      { id: 'me2', term: 'Rahim as well as his brothers', match: 'Agrees with Rahim (Singular)' },
      { id: 'me3', term: 'Neither the teacher nor the students', match: 'Agrees with students (Plural)' },
      { id: 'me4', term: 'Bread and butter (favorite breakfast)', match: 'Singular idea (takes is)' }
    ],
    miniQuizQuestionIds: ['e-01', 'e-06']
  },

  {
    id: 'english-prepositions',
    subjectId: 'english',
    title: 'Appropriate Prepositions & Rules',
    slug: 'appropriate-prepositions',
    badge: 'অনিবার্য টপিক',
    description: 'Die of, Die from, Die by, Die for সহ বিভ্রান্তিকর Preposition-এর নির্ভুল তালিকা।',
    prerequisiteConcepts: [
      {
        title: 'Die এর বিভিন্ন Preposition ব্যবহারের মাস্টার রুল',
        summary: 'মৃত্যুর কারণ অনুযায়ী ইংরেজি ভাষায় বিভিন্ন Preposition বসে। এটি চাকরি পরীক্ষার অন্যতম প্রিয় প্রশ্ন।',
        keyPoints: [
          'Die OF + disease (রোগে মারা যাওয়া): He died of cancer/cholera.',
          'Die FROM + cause/overwork/overeating (কোনো কারণ/অতিরিক্ত কাজে মারা যাওয়া): He died from overeating.',
          'Die BY + suicide/poison/violence (আত্মহত্যা/বিষপানে মারা যাওয়া): He died by suicide.',
          'Die FOR + country/cause (দেশ বা মহৎ উদ্দেশ্যের জন্য জীবন উৎসর্গ করা): He died for his country.'
        ],
        formulaOrRule: 'OF = Disease, FROM = Effect/Cause, BY = Weapon/Poison, FOR = Country/Noble cause.'
      }
    ],
    flashcards: [
      { id: 'fc-p1', front: 'He died ___ malaria.', back: 'of (Disease takes "of")', hint: 'Malaria is a disease' },
      { id: 'fc-p2', front: 'He died ___ hunger / overeating.', back: 'from (Effect / Indirect cause takes "from")', hint: 'Cause or effect' },
      { id: 'fc-p3', front: 'He died ___ the country.', back: 'for (Sacrifice for noble cause)', hint: 'Patriotism' },
      { id: 'fc-p4', front: 'Prevent someone ___ doing something.', back: 'from', hint: 'Abstain from, prevent from' }
    ],
    matchGameItems: [
      { id: 'mp1', term: 'Die of', match: 'Disease (রোগে মৃত্যু)' },
      { id: 'mp2', term: 'Die from', match: 'Overeating / Wound (কারণবশত)' },
      { id: 'mp3', term: 'Die for', match: 'Country / Noble cause (আত্মত্যাগ)' },
      { id: 'mp4', term: 'Die by', match: 'Suicide / Violence (সহিংসতা)' }
    ],
    miniQuizQuestionIds: ['e-02', 'e-03']
  },

  // ================= MATHEMATICS LESSONS =================
  {
    id: 'math-percentage-profit',
    subjectId: 'math',
    title: 'শতকরা ও লাভ-ক্ষতির বেসিক কনসেপ্ট',
    slug: 'percentage-and-profit-loss',
    badge: 'গণিত ফাউন্ডেশন',
    description: 'ক্রয়মূল্য, বিক্রয়মূল্য, ধার্যমূল্য এবং ১০ সেকেন্ডে শতকরা ও লাভ-ক্ষতি নির্ণয়ের টেকনিক।',
    prerequisiteConcepts: [
      {
        title: 'লাভ ও ক্ষতির মৌলিক ধারণা ও সূত্রাবলী',
        summary: 'চাকরি পরীক্ষার পাটিগণিতে শতকরা ও লাভ-ক্ষতি থেকে ন্যূনতম ২-৩টি প্রশ্ন থাকবেই। মূল বিষয় হলো ক্রয়মূল্য ও বিক্রয়মূল্যের সম্পর্ক বোঝা।',
        keyPoints: [
          'লাভ বা ক্ষতি সর্বদা ক্রয়মূল্যের (Cost Price) উপর হিসাব করা হয়।',
          'লাভ = বিক্রয়মূল্য - ক্রয়মূল্য',
          'ক্ষতি = ক্রয়মূল্য - বিক্রয়মূল্য',
          'শতকরা লাভ = (মোট লাভ ÷ ক্রয়মূল্য) × ১০০%',
          'শতকরা ক্ষতি = (মোট ক্ষতি ÷ ক্রয়মূল্য) × ১০০%'
        ],
        formulaOrRule: '১০ সেকেন্ড শর্টকাট: ক্রয়মূল্য = {বিক্রয়মূল্য ÷ (১০০ ± শতকরা লাভ বা ক্ষতি)} × ১০০',
        commonTrap: 'প্রশ্ন ভালো করে পড়ুন: "ক্রয়মূল্যের উপর লাভ" চেয়েছে নাকি "বিক্রয়মূল্যের উপর"? কিছু না বললে সর্বদা ক্রয়মূল্যের উপর হিসেব করতে হবে।',
        example: {
          q: 'একটি ঘড়ি ৪৫০ টাকায় বিক্রয় করায় ১০% ক্ষতি হলো। ঘড়িটির ক্রয়মূল্য কত?',
          a: '৫০০ টাকা',
          note: 'ক্রয়মূল্য = {৪৫০ ÷ (১০০ - ১০)} × ১০০ = (৪৫০ ÷ ৯০) × ১০০ = ৫ × ১০০ = ৫০০ টাকা।'
        }
      },
      {
        title: 'ধার্যমূল্য ও কমিশন সংক্রান্ত নিয়ম',
        summary: 'কমিশন বা ছাড় সর্বদা ধার্যমূল্য (Marked Price)-এর উপর দেওয়া হয়।',
        keyPoints: [
          'বিক্রয়মূল্য = ধার্যমূল্য - কমিশন',
          'কমিশন শতকরা = (কমিশন ÷ ধার্যমূল্য) × ১০০%'
        ]
      }
    ],
    flashcards: [
      { id: 'fc-m1', front: 'শতকরা লাভ বা ক্ষতি কিসের উপর হিসাব করা হয়?', back: 'ক্রয়মূল্য (Cost Price)', hint: 'সর্বদা আসল খরচের উপর' },
      { id: 'fc-m2', front: 'কোনো দ্রব্যে ২০% লাভ হলে বিক্রয়মূল্য ক্রয়মূল্যের কত অংশ?', back: '১২০% বা ৬/৫ অংশ', hint: '১০০ + ২০ = ১২০' },
      { id: 'fc-m3', front: '৫০০ টাকায় কিনে ৬০০ টাকায় বিক্রি করলে শতকরা লাভ?', back: '২০% লাভ (১০০ / ৫০০ × ১০০%)', hint: 'লাভ ১০০ টাকা' },
      { id: 'fc-m4', front: 'ছাড় বা ডিসকাউন্ট কিসের উপর দেওয়া হয়?', back: 'ধার্যমূল্য বা এমআরপি (Marked Price)', hint: 'গায়ের লেখা দাম' }
    ],
    matchGameItems: [
      { id: 'mm1', term: 'লাভ (Profit)', match: 'বিক্রয়মূল্য - ক্রয়মূল্য' },
      { id: 'mm2', term: 'ক্ষতি (Loss)', match: 'ক্রয়মূল্য - বিক্রয়মূল্য' },
      { id: 'mm3', term: 'শতকরা লাভ', match: '(লাভ / ক্রয়মূল্য) × ১০০%' },
      { id: 'mm4', term: 'কমিশন ছাড়', match: 'ধার্যমূল্য - বিক্রয়মূল্য' }
    ],
    miniQuizQuestionIds: ['m-01', 'm-03']
  },

  {
    id: 'math-algebra-formulas',
    subjectId: 'math',
    title: 'বীজগণিতীয় সূত্র ও মান নির্ণয়',
    slug: 'algebraic-formulas',
    badge: 'সূত্র ও শর্টকাট',
    description: '(a+b)², (a-b)², ab, a³+b³ সূত্রাবলির বাস্তব প্রয়োগ ও মুখে মুখে মান বের করার টেকনিক।',
    prerequisiteConcepts: [
      {
        title: 'মান নির্ণয়ের ৫টি সুপার ফর্মুলা',
        summary: 'মান নির্ণয়ের জটিল অঙ্কগুলো সাধারণ কিছু সূত্রের অনুসিদ্ধান্ত দিয়েই কয়েক লাইনে সমাধান করা যায়।',
        keyPoints: [
          '4ab = (a + b)² - (a - b)²',
          'ab = {(a + b)/2}² - {(a - b)/2}²',
          '2(a² + b²) = (a + b)² + (a - b)²',
          'a³ + b³ = (a + b)³ - 3ab(a + b)',
          'a³ - b³ = (a - b)³ + 3ab(a - b)'
        ],
        formulaOrRule: 'গোল্ডেন ট্রিক: যদি x + 1/x = k হয়, তবে x² + 1/x² = k² - 2 এবং x³ + 1/x³ = k³ - 3k।',
        example: {
          q: 'যদি x + 1/x = 3 হয়, তবে x³ + 1/x³ এর মান কত?',
          a: '18',
          note: 'শর্টকাট: k³ - 3k = 3³ - 3(3) = 27 - 9 = 18।'
        }
      }
    ],
    flashcards: [
      { id: 'fc-a1', front: 'ab এর মান নির্ণয়ের সূত্র কী?', back: '{(a+b)/2}² - {(a-b)/2}²', hint: '4ab এর চারভাগের একভাগ' },
      { id: 'fc-a2', front: 'যদি x + 1/x = 4 হয়, তবে x² + 1/x² = ?', back: '14 (Formula: k² - 2 = 16 - 2 = 14)', hint: 'বর্গ করে ২ বিয়োগ' },
      { id: 'fc-a3', front: '4ab সূত্রটি কী?', back: '(a + b)² - (a - b)²', hint: 'মাঝখানে মাইনাস চিহ্ন' },
      { id: 'fc-a4', front: '2(a² + b²) সূত্রটি কী?', back: '(a + b)² + (a - b)²', hint: 'মাঝখানে প্লাস চিহ্ন' }
    ],
    matchGameItems: [
      { id: 'ma1', term: '4ab', match: '(a + b)² - (a - b)²' },
      { id: 'ma2', term: '2(a² + b²)', match: '(a + b)² + (a - b)²' },
      { id: 'ma3', term: 'a² - b²', match: '(a + b)(a - b)' },
      { id: 'ma4', term: 'x + 1/x = 3 হলে x² + 1/x²', match: '7 (3² - 2)' }
    ],
    miniQuizQuestionIds: ['m-02', 'm-04']
  },

  // ================= GK BANGLADESH LESSONS =================
  {
    id: 'gkb-liberation-war',
    subjectId: 'gk_bangladesh',
    title: 'মুক্তিযুদ্ধ ও স্বাধীনতা সংগ্রাম (১৯৭১)',
    slug: 'liberation-war-1971',
    badge: 'সবচেয়ে গুরুত্বপূর্ণ',
    description: '১১টি সেক্টর, সেক্টর কমান্ডার, মুজিবনগর সরকার ও বীরশ্রেষ্ঠদের পরিচিতি।',
    prerequisiteConcepts: [
      {
        title: 'মুজিবনগর সরকার গঠন ও শপথ গ্রহণ',
        summary: '১৯৭১ সালের ১০ এপ্রিল গঠিত হয় গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (মুজিবনগর সরকার) এবং ১৭ এপ্রিল মেহেরপুরের বৈদ্যনাথতলার ভবেরপাড়া (বর্তমান মুজিবনগর)-এর আম্রকাননে আনুষ্ঠানিকভাবে শপথ গ্রহণ করে।',
        keyPoints: [
          'রাষ্ট্রপতি: বঙ্গবন্ধু শেখ মুজিবুর রহমান (অনুপস্থিতিতে অস্থায়ী রাষ্ট্রপতি সৈয়দ নজরুল ইসলাম)',
          'প্রধানমন্ত্রী: তাজউদ্দীন আহমদ',
          'অর্থমন্ত্রী: এম মনসুর আলী',
          'পররাষ্ট্র ও আইনমন্ত্রী: খন্দকার মোশতাক আহমদ',
          'স্বরাষ্ট্র ও ত্রাণমন্ত্রী: এ এইচ এম কামারুজ্জামান',
          'প্রধান সেনাপতি: কর্নেল (পরবর্তীতে জেনারেল) এম এ জি ওসমানী'
        ],
        formulaOrRule: 'মনে রাখার ট্রিক: "১০ এপ্রিল গঠন, ১৭ এপ্রিল শপথ, শপথ বাক্য পাঠ করান অধ্যাপক ইউসুফ আলী।"'
      },
      {
        title: '১১টি সেক্টরের বিশেষত্ব',
        summary: 'সমগ্র দেশকে ১১টি সেক্টরে ভাগ করা হয়। এর মধ্যে ১০ নম্বর সেক্টর ছিল ব্যতিক্রমী।',
        keyPoints: [
          '১০ নম্বর সেক্টর: কোনো নিয়মিত সেক্টর কমান্ডার ছিলেন না। এটি ছিল নৌ কমান্ডোদের অধীনে বিশেষ হেডকোয়ার্টার সেক্টর।',
          'সেক্টর ১: চট্টগ্রাম, পার্বত্য চট্টগ্রাম ও নোয়াখালী (মেজর জিয়াউর রহমান, পরবর্তীতে মেজর রফিকুল ইসলাম)।',
          'সেক্টর ২: ঢাকা, কুমিল্লা, ফরিদপুর (মেজর খালেদ মোশাররফ, মেজর এ টি এম হায়দার)। ক্র্যাক প্লাটুন এখানেই ছিল।'
        ]
      }
    ],
    flashcards: [
      { id: 'fc-w1', front: 'মুক্তিযুদ্ধের কোন সেক্টরে কোনো নিয়মিত কমান্ডার ছিলেন না?', back: '১০ নম্বর সেক্টর (নৌ সেক্টর)', hint: 'নৌ কমান্ডোদের সেক্টর' },
      { id: 'fc-w2', front: 'মুজিবনগর সরকার কবে শপথ গ্রহণ করে?', back: '১৭ এপ্রিল ১৯৭১', hint: '১০ এপ্রিল গঠিত, ১৭ এপ্রিল শপথ' },
      { id: 'fc-w3', front: 'মুজিবনগর সরকারের প্রধানমন্ত্রী কে ছিলেন?', back: 'তাজউদ্দীন আহমদ', hint: 'বঙ্গবন্ধু রাষ্ট্রপতি ছিলেন' },
      { id: 'fc-w4', front: 'মুক্তিযুদ্ধে বীরশ্রেষ্ঠ উপাধিপ্রাপ্ত সর্বমোট কতজন?', back: '৭ জন', hint: 'প্রথম শহীদ মোস্তফা কামাল, শেষ মহিউদ্দিন জাহাঙ্গীর' }
    ],
    matchGameItems: [
      { id: 'mw1', term: '১০ নম্বর সেক্টর', match: 'নৌ কমান্ডো (নিয়মিত কমান্ডারহীন)' },
      { id: 'mw2', term: 'প্রধানমন্ত্রী', match: 'তাজউদ্দীন আহমদ' },
      { id: 'mw3', term: 'অস্থায়ী রাষ্ট্রপতি', match: 'সৈয়দ নজরুল ইসলাম' },
      { id: 'mw4', term: 'প্রধান সেনাপতি', match: 'কর্নেল এম এ জি ওসমানী' }
    ],
    miniQuizQuestionIds: ['gkb-01', 'gkb-02']
  },

  // ================= GK INTERNATIONAL LESSONS =================
  {
    id: 'gki-un-orgs',
    subjectId: 'gk_international',
    title: 'জাতিসংঘ ও বৈশ্বিক সংস্থাসমূহ',
    slug: 'united-nations-and-global-orgs',
    badge: 'আন্তর্জাতিক কোর',
    description: 'জাতিসংঘের ৬টি মূল অঙ্গসংগঠন, নিরাপত্তা পরিষদ, বিশেষায়িত সংস্থা ও তাদের সদর দপ্তর।',
    prerequisiteConcepts: [
      {
        title: 'জাতিসংঘের গঠন ও মূল অঙ্গসংগঠন',
        summary: 'দ্বিতীয় বিশ্বযুদ্ধের প্রেক্ষাপটে বিশ্বশান্তি প্রতিষ্ঠার লক্ষ্যে ১৯৪৫ সালের ২৪ অক্টোবর জাতিসংঘ (UN) আনুষ্ঠানিকভাবে প্রতিষ্ঠিত হয়। এর সদর দপ্তর যুক্তরাষ্ট্রের নিউইয়র্কে।',
        keyPoints: [
          'মূল অঙ্গসংগঠন ৬টি: সাধারণ পরিষদ, নিরাপত্তা পরিষদ, অর্থনৈতিক ও সামাজিক পরিষদ, ওসি পরিষদ, আন্তর্জাতিক আদালত (ICJ), এবং সচিবালয়।',
          'নিরাপত্তা পরিষদের সদস্য ১৫টি: স্থায়ী ৫টি (যুক্তরাষ্ট্র, যুক্তরাজ্য, ফ্রান্স, রাশিয়া, চীন) যাদের ভেটো ক্ষমতা রয়েছে, এবং অস্থায়ী ১০টি (২ বছরের জন্য নির্বাচিত)।',
          'আন্তর্জাতিক বিচার আদালত (ICJ)-এর সদর দপ্তর: দ্য হেগ, নেদারল্যান্ডস।'
        ],
        formulaOrRule: 'স্থায়ী ৫ সদস্য মনে রাখার ট্রিক: "FRACE" -> France, Russia, America, China, England.'
      },
      {
        title: 'গুরুত্বপূর্ণ আন্তর্জাতিক সংস্থার সদর দপ্তর মনে রাখার সহজ টেকনিক',
        summary: 'বেশিরভাগ সংস্থা বিশেষ কিছু শহরে পুঞ্জীভূত।',
        keyPoints: [
          'জেনেভা (সুইজারল্যান্ড): WHO (স্বাস্থ্য), WTO (বাণিজ্য), ILO (শ্রম), WIPO, UNHCR, Red Cross।',
          'ওয়াশিংটন ডিসি (যুক্তরাষ্ট্র): World Bank, IMF (টাকা-পয়সা সংক্রান্ত সংস্থা)।',
          'প্যারিস (ফ্রান্স): UNESCO, OECD।',
          'রোম (ইতালি): FAO, WFP (খাদ্য ও কৃষি সংক্রান্ত)।'
        ]
      }
    ],
    flashcards: [
      { id: 'fc-u1', front: 'জাতিসংঘের নিরাপত্তা পরিষদে স্থায়ী সদস্য কতটি?', back: '৫টি (ভেটো ক্ষমতাপ্রাপ্ত দেশ)', hint: 'যুক্তরাষ্ট্র, যুক্তরাজ্য, রাশিয়া, চীন, ফ্রান্স' },
      { id: 'fc-u2', front: 'বিশ্বব্যাংক ও আইএমএফ-এর সদর দপ্তর কোথায়?', back: 'ওয়াশিংটন ডিসি, যুক্তরাষ্ট্র', hint: 'টাকা-পয়সা সম্পর্কিত' },
      { id: 'fc-u3', front: 'আন্তর্জাতিক আদালত (ICJ) কোথায় অবস্থিত?', back: 'দ্য হেগ, নেদারল্যান্ডস', hint: 'নেদারল্যান্ডসে অবস্থিত' },
      { id: 'fc-u4', front: 'WHO (বিশ্ব স্বাস্থ্য সংস্থা)-এর সদর দপ্তর কোথায়?', back: 'জেনেভা, সুইজারল্যান্ড', hint: 'সুইজারল্যান্ডের অন্যতম শহর' }
    ],
    matchGameItems: [
      { id: 'mu1', term: 'World Bank & IMF', match: 'ওয়াশিংটন ডিসি' },
      { id: 'mu2', term: 'WHO & WTO', match: 'জেনেভা' },
      { id: 'mu3', term: 'UNESCO', match: 'প্যারিস' },
      { id: 'mu4', term: 'FAO & WFP (খাদ্য)', match: 'রোম' }
    ],
    miniQuizQuestionIds: ['gki-01', 'gki-02']
  }
];
