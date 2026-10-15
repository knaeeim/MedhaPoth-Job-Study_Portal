import { NextRequest, NextResponse } from 'next/server';

interface QuestionExtractionResult {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subjectId: string;
  topic: string;
  examSource: string;
  year: number;
  confidence: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType = 'image/jpeg', apiKey: clientApiKey } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'কোনো ইমেজ ডাটা পাওয়া যায়নি!' },
        { status: 400 }
      );
    }

    const apiKey = clientApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'NO_API_KEY',
          message: 'গুগল জেমিনাই (Gemini Vision) এপিআই কী প্রয়োজন। অনুগ্রহ করে আপনার ফ্রি জেমিনাই এপিআই কী দিন (aistudio.google.com থেকে সম্পূর্ণ ফ্রি পাওয়া যায়)।'
        },
        { status: 401 }
      );
    }

    // Clean base64
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    // 1. DYNAMIC MODEL DISCOVERY: Find valid models enabled for this API key
    let candidateModels: string[] = [];
    try {
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );

      if (listRes.ok) {
        const listData = await listRes.json();
        if (Array.isArray(listData.models)) {
          const contentModels = listData.models
            .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
            .map((m: any) => m.name.replace(/^models\//, ''));

          // Sort prioritizing fast multimodal models
          const flashModels = contentModels.filter((m: string) => m.includes('flash'));
          const proModels = contentModels.filter((m: string) => m.includes('pro') && !m.includes('flash'));
          const otherModels = contentModels.filter((m: string) => !m.includes('flash') && !m.includes('pro'));

          candidateModels = [...flashModels, ...proModels, ...otherModels];
        }
      }
    } catch (discoveryErr) {
      console.warn('Dynamic model discovery failed, falling back to static list:', discoveryErr);
    }

    // Fallback candidate list if discovery returned nothing
    if (candidateModels.length === 0) {
      candidateModels = [
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash',
        'gemini-1.5-pro-latest',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-2.0-flash-exp',
        'gemini-2.5-flash'
      ];
    }

    const promptText = `You are a world-class AI document OCR and exam question extraction expert specializing in Bangladeshi competitive exams (BCS Preliminary, Bank Recruitment, Primary Teacher, NTRCA, and Govt Jobs).

You are given an image of a real question paper or guide book containing multiple multiple-choice questions (MCQs) in Bengali and/or English.

YOUR MISSION:
Carefully scan the ENTIRE image and extract EVERY SINGLE QUESTION visible. If there are 5, 10, 15, 17, or 20 questions, you must extract ALL of them! Do not omit or truncate any question.

For each question found in the image, extract and structure it strictly into this JSON format:
{
  "question": "Full verbatim question text in Bengali or English (including question number if present)",
  "options": [
    "Option 1 text (e.g. ক এর বক্তব্য)",
    "Option 2 text (e.g. খ এর বক্তব্য)",
    "Option 3 text (e.g. গ এর বক্তব্য)",
    "Option 4 text (e.g. ঘ এর বক্তব্য)"
  ],
  "correctAnswer": 0, // 0 for ক/A, 1 for খ/B, 2 for গ/C, 3 for ঘ/D. If an answer key or tick/circle is visible in the image, use it. Otherwise, solve the question accurately using expert academic knowledge.
  "explanation": "Detailed explanation in Bengali explaining step-by-step why this answer is correct, with shortcut techniques and rules",
  "subjectId": "one of: 'bangla', 'english', 'math', 'gk_bangladesh', 'gk_international'",
  "topic": "Specific topic name (e.g. সন্ধি, সমাস, শতকরা, Preposition, মুক্তিযুদ্ধ ১৯৭১, জাতিসংঘ)",
  "examSource": "Exam title if visible or 'ছবি থেকে স্ক্যানকৃত প্রশ্ন'",
  "year": 2025,
  "confidence": 98
}

SUBJECT CLASSIFICATION RULES:
- 'bangla': Bengali language, grammar (ধ্বনি, বর্ণ, সন্ধি, সমাস, কারক, প্রত্যয়), Bengali literature.
- 'english': English grammar, vocabulary, idioms, literature.
- 'math': Arithmetic, algebra, geometry, percentage, profit-loss, mental ability.
- 'gk_bangladesh': Bangladesh history, 1971 Liberation War, Constitution, geography, economy, mega projects.
- 'gk_international': UN, international bodies, world politics, Nobel prize, treaties, global affairs.

IMPORTANT: Output ONLY a valid JSON array of question objects (e.g. [ { ... }, { ... } ]). Do NOT output markdown code blocks outside JSON.`;

    let responseText: string | null = null;
    let successfulModel: string | null = null;
    let lastErrorDetails: any = null;

    // 2. Try models sequentially until one succeeds
    for (const modelName of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        
        const payload = {
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: cleanBase64
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 8192
          }
        };

        const apiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (apiRes.ok) {
          const resData = await apiRes.json();
          const candidate = resData.candidates?.[0];
          const partText = candidate?.content?.parts?.[0]?.text;
          if (partText) {
            responseText = partText;
            successfulModel = modelName;
            break; // Success!
          }
        } else {
          const errData = await apiRes.json().catch(() => ({}));
          lastErrorDetails = errData;
          // If 404 or unsupported, continue to next model candidate
          console.warn(`Model ${modelName} returned status ${apiRes.status}, trying next...`);
        }
      } catch (err: any) {
        lastErrorDetails = err;
        console.warn(`Error attempting model ${modelName}:`, err.message);
      }
    }

    if (!responseText) {
      const errMsg = lastErrorDetails?.error?.message || 'আপনার এপিআই কী-এর জন্য কোনো সক্রিয় ভিশন মডেল পাওয়া যায়নি।';
      return NextResponse.json(
        {
          error: 'MODEL_UNAVAILABLE',
          message: `গুগল জেমিনাই এরর: ${errMsg}। অনুগ্রহ করে aistudio.google.com থেকে নতুন একটি ফ্রি API Key তৈরি করে দিন।`
        },
        { status: 500 }
      );
    }

    // 3. PARSE JSON SAFELY
    let parsedQuestions: QuestionExtractionResult[] = [];
    try {
      let cleanedJson = responseText.trim();
      if (cleanedJson.startsWith('```json')) {
        cleanedJson = cleanedJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedJson.startsWith('```')) {
        cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      parsedQuestions = JSON.parse(cleanedJson);
    } catch {
      // Regex extraction fallback
      const match = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) {
        parsedQuestions = JSON.parse(match[0]);
      } else {
        return NextResponse.json(
          {
            error: 'PARSE_ERROR',
            message: 'ইমেজ থেকে টেক্সট পাওয়া গেছে কিন্তু সঠিক প্রশ্ন ফরম্যাটে রূপান্তর করা যায়নি।',
            raw: responseText.slice(0, 500)
          },
          { status: 500 }
        );
      }
    }

    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      return NextResponse.json(
        { error: 'NO_QUESTIONS_FOUND', message: 'ছবিতে কোনো প্রশ্ন সনাক্ত করা যায়নি। অনুগ্রহ করে পরিষ্কার ও সোজা ছবি দিন।' },
        { status: 404 }
      );
    }

    // 4. FORMAT AND VALIDATE ALL EXTRACTED QUESTIONS
    const formattedQuestions = parsedQuestions.map((q: any, idx: number) => ({
      id: `ocr-${Date.now()}-${idx}`,
      question: String(q.question || `প্রশ্ন ${idx + 1}`),
      options: Array.isArray(q.options) && q.options.length >= 4 
        ? q.options.slice(0, 4).map(String)
        : Array.isArray(q.options) && q.options.length > 0
        ? [...q.options.map(String), 'অপশন খ', 'অপশন গ', 'অপশন ঘ'].slice(0, 4)
        : ['অপশন ক', 'অপশন খ', 'অপশন গ', 'অপশন ঘ'],
      correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3 
        ? q.correctAnswer 
        : 0,
      explanation: String(q.explanation || 'সঠিক উত্তরের বিশদ শর্টকাট ব্যাখ্যা।'),
      subjectId: ['bangla', 'english', 'math', 'gk_bangladesh', 'gk_international'].includes(q.subjectId)
        ? q.subjectId
        : 'bangla',
      topic: String(q.topic || 'সাধারণ'),
      examSource: String(q.examSource || 'ছবি থেকে স্ক্যানকৃত'),
      year: Number(q.year) || 2025,
      confidence: Number(q.confidence) || 96,
      tags: ['AI_OCR', String(q.subjectId || 'bangla')],
      selected: true
    }));

    return NextResponse.json({
      success: true,
      modelUsed: successfulModel,
      count: formattedQuestions.length,
      questions: formattedQuestions
    });

  } catch (error: any) {
    console.error('OCR Extraction API Global Error:', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: error.message || 'ইমেজ প্রসেসিং করতে সমস্যা হয়েছে। আপনার এপিআই কী ও ইন্টারনেট সংযোগ যাচাই করুন।'
      },
      { status: 500 }
    );
  }
}
