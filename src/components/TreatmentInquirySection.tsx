import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Leaf, 
  Activity, 
  FileText, 
  Printer, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { TreatmentInquiry } from '../types';
import { saveInquiry } from '../utils/storage';

interface TreatmentInquirySectionProps {
  prefilledHerb?: string;
  onOpenBooking: () => void;
  onInquirySaved: () => void;
}

export const TreatmentInquirySection: React.FC<TreatmentInquirySectionProps> = ({
  prefilledHerb,
  onOpenBooking,
  onInquirySaved,
}) => {
  // Form state
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bodyPart, setBodyPart] = useState('back');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomDuration, setSymptomDuration] = useState('1-3-months');
  const [conditionDescription, setConditionDescription] = useState(
    prefilledHerb ? `أرغب في الاستفسار عن مدى ملاءمة عشبة (${prefilledHerb}) لحالتي الصحية وطريقة الاستخدام المثلى.` : ''
  );
  const [preferredApproach, setPreferredApproach] = useState<'all' | 'physiotherapy' | 'quran' | 'herbal'>('all');

  // Submission state
  const [submittedInquiry, setSubmittedInquiry] = useState<TreatmentInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);

  // Sync prefilled herb
  React.useEffect(() => {
    if (prefilledHerb) {
      setConditionDescription(`أرغب في الاستفسار عن مدى ملاءمة عشبة (${prefilledHerb}) لحالتي الصحية وطريقة الاستخدام المثلى.`);
    }
  }, [prefilledHerb]);

  const bodyParts = [
    { id: 'back', label: 'أسفل الظهر والعمود الفقري' },
    { id: 'neck', label: 'الرقبة والكتف والأبهر' },
    { id: 'knee', label: 'الركبة ومفاصل الساقين' },
    { id: 'colon', label: 'القولون والجهاز الهضمي' },
    { id: 'chest', label: 'الصدر والجهاز التنفسي' },
    { id: 'spiritual', label: 'الضيق النفسي والأرق والوسواس' },
  ];

  const availableSymptoms = [
    'ألم متواصل حاد',
    'تيبس وصعوبة حركة صباحية',
    'تنميل وخدر في الأطراف',
    'صداع وشقيقة مستمرة',
    'أرق وكوابيس أثناء النوم',
    'انتفاخ وغازات مستمرة',
    'ضيق وثقل في الصدر',
    'خفقان وتسارع نبضات',
    'فتور وضعف طاقة عام',
  ];

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert('يرجى إدخال الاسم ورقم الجوال للتواصل');
      return;
    }

    setIsSubmitting(true);

    // Generate intelligent instant holistic protocol
    const randomCode = `SHF-INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    let recommendedQuran = ['سورة الفاتحة 7 مرات مع النفث', 'آية الكرسي والمعوذتين'];
    let recommendedHerbs = ['الحبة السوداء مع عسل النحل', 'زيت الزيتون البكر المقروء عليه'];
    let physioAdvice = ['المشي الخفيف 20 دقيقة يومياً', 'تجنب الجلوس المنحني الطويل'];
    let propheticTip = 'قال ﷺ: "تداووا عباد الله، فإن الله لم يضع داء إلا وضع له شفاء".';

    if (bodyPart === 'back' || bodyPart === 'knee') {
      recommendedQuran = [
        'سورة الفاتحة 7 مرات مع مسح موضع الألم',
        'دعاء عثمان بن أبي العاص: (أعوذ بعزة الله وقدرته من شر ما أجد وأحاذر 7 مرات)',
        'آية الشفاء: {وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ}'
      ];
      recommendedHerbs = [
        'الكركم العلاجي مع رشة فلفل أسود (مضاد قوي لالتهاب المفاصل)',
        'الزنجبيل البري (دافئ ومسكن للمفاصل)',
        'دهان المفاصل بزيت الزيتون الدافئ المقروء عليه'
      ];
      physioAdvice = [
        'أداء تمرين القطة والجمل لتليين الفقرات القطنية',
        'تطبيق كمادات دافئة لمدة 15 دقيقة قبل النوم',
        'تجنب حمل الأثقال بظهر منحنٍ واستخدام الركبتين'
      ];
      propheticTip = 'الحجامة في الكاهل والأخدعين وعلى مواضع الألم تخفف احتقان العضلات وتنشط التروية الدموية.';
    } else if (bodyPart === 'colon') {
      recommendedQuran = [
        'سورة الفاتحة مع قراءتها على ماء زمزم والشرب منه على الريق',
        'آية الشفاء: {يَخْرُجُ مِن بُطُونِهَا شَرَابٌ مُّخْتَلِفٌ أَلْوَانُهُ فِيهِ شِفَاءٌ لِّلنَّاسِ}'
      ];
      recommendedHerbs = [
        'شاي البابونج واليانسون والنعناع (مهدئ ومضاد لتشنج القولون)',
        'عسل السدر الطبيعي على الريق مع ماء دافئ',
        'السنا والسنوت شهرياً لتنظيف البطن والسموم'
      ];
      physioAdvice = [
        'تمارين التنفس البطني العميق (Diaphragmatic Breathing) لتهدئة العصب الحائر',
        'المشي بعد الوجبات وتجنب النوم فور تناول الطعام'
      ];
      propheticTip = 'قال رسول الله ﷺ: "ما ملأ آدمي وعاءً شراً من بطن، بحسب ابن آدم أكلات يقمن صلبه".';
    } else if (bodyPart === 'spiritual') {
      recommendedQuran = [
        'قراءة سورة البقرة في المنزل كل ثلاثة أيام',
        'الرقية الشرعية المطولة بآيات الحفظ والسكينة',
        'أذكار الصباح والمساء، ودعاء الكرب والهم'
      ];
      recommendedHerbs = [
        'مغلي الخزامى (اللافندر) مع البابونج قبل النوم بساعة',
        'القسط الهندي مسحوقاً مع العسل',
        'التلبينة النبوية (حساء الشعير مع العسل والحليب) تذهب ببعض الحزن'
      ];
      physioAdvice = [
        'تمارين الاسترخاء العضلي التدريجي',
        'التعرض لضوء الشمس الصباحي 20 دقيقة لضبط إيقاع الميلاتونين والسيروتونين'
      ];
      propheticTip = 'قال ﷺ في التلبينة: "إنها تجم فؤاد المريض، وتذهب ببعض الحزن".';
    }

    const newInquiry: TreatmentInquiry = {
      id: Date.now().toString(),
      inquiryCode: randomCode,
      userName,
      userPhone,
      userEmail,
      age,
      gender,
      bodyPart: bodyParts.find((b) => b.id === bodyPart)?.label || bodyPart,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['ألم عام وإرهاق'],
      symptomDuration,
      conditionDescription,
      preferredHealingApproach: preferredApproach,
      createdAt: new Date().toLocaleDateString('ar-SA'),
      status: 'answered',
      autoRecommendation: {
        quranVerses: recommendedQuran,
        recommendedHerbs,
        physioAdvice,
        propheticMedicineTip: propheticTip,
      },
    };

    saveInquiry(newInquiry);
    onInquirySaved();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedInquiry(newInquiry);
    }, 600);
  };

  const handlePrintProtocol = () => {
    window.print();
  };

  const FAQs = [
    {
      q: 'هل يتعارض التداوي بالقرآن والرقية مع مراجعة الأطباء والعلاج الطبيعي؟',
      a: 'أبداً، بل يتكاملان تكاملاً بديعاً. التداوي بالقرآن عبادة واستشفاء بالسبب الشرعي، والعلاج الطبيعي والأدوية أسباب قدرية جعلها الله، والجمع بينهما من كمال التوكل وحسن الأخذ بالأسباب كما أمر المصطفى ﷺ.'
    },
    {
      q: 'كيف أعرف هل حالتي تحتاج لعلاج طبيعي أم رقية شرعية؟',
      a: 'في مركزنا يقوم الفريق الطبي بفحص الأعراض أولاً. إذا كانت الفحوصات والأشعة تظهر انزلاقاً غضروفياً أو خشونة واضحة فالعلاج الطبيعي هو الأساس مع الرقية المساندة. أما إذا كانت الفحوصات سليمة تماماً مع وجود ضيق مفاجئ، نفور، كوابيس مستمرة، وأوجاع متنقلة فيكون التركيز على الرقية الشرعية.'
    },
    {
      q: 'هل يمكن للأعشاب أن تعالج الانزلاق الغضروفي (الديسك)؟',
      a: 'الأعشاب الطبيعية كالكركم والزنجبيل واللبان الذكر تخفف الالتهاب حول العصب المحتقن بنسبة كبيرة، لكنها لا تعيد الغضروف المندفع بذاتها. لذلك لابد من تمارين العلاج الطبيعي لتقويم الميكانيكا الحركية مع الأعشاب لتسكين الالتهاب.'
    },
    {
      q: 'ما هي الطريقة الصحيحة للقراءة على ماء الشرب وزيت الزيتون؟',
      a: 'تقرب الإناء من فمك، وتقرأ سورة الفاتحة وآية الكرسي والمعوذتين وآيات الشفاء بخشوع وتدبر، وتنفث (نفخ لطيف مع قليل من الريق) في الإناء بعد كل قراءة، ثم تشرب من الماء وتدهن بالزيت مواضع الألم.'
    }
  ];

  return (
    <section id="inquiry" className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold mb-4 border border-emerald-300">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>خدمة الاستفسار والتشخيص العلاجي الشامل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 font-tajawal mb-4">
            استفسر عن علاج حالتك واحصل على خطة فورية
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-tajawal">
            صف أعراضك بدقة وسيقوم نظامنا المتكامل بتقديم بروتوكول استشفائي ثلاثي (قرآني، وفيزيائي، وعشبي) مع إرسال استفسارك مباشرة للأطباء والمشايخ.
          </p>
        </div>

        {/* Results Modal / View if already submitted */}
        {submittedInquiry ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-2xl space-y-8 animate-in fade-in duration-300">
            
            {/* Top Success Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-emerald-950 font-tajawal">
                    تم استلام استفسارك بنجاح وإعداد خطتك العلاجية
                  </h3>
                  <p className="text-xs text-emerald-800">
                    رقم الملف الاستشاري: <strong className="font-mono text-sm">{submittedInquiry.inquiryCode}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={handlePrintProtocol}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 font-bold text-xs hover:bg-emerald-100 shadow-sm transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الخطة</span>
              </button>
            </div>

            {/* Patient Summary Card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block">المريض:</span>
                <strong className="text-stone-900">{submittedInquiry.userName}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">المنطقة المتأثرة:</span>
                <strong className="text-stone-900">{submittedInquiry.bodyPart}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">العمر والجنس:</span>
                <strong className="text-stone-900">{submittedInquiry.age} سنة • {submittedInquiry.gender === 'male' ? 'ذكر' : 'أنثى'}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">تاريخ الإرسال:</span>
                <strong className="text-stone-900">{submittedInquiry.createdAt}</strong>
              </div>
            </div>

            {/* Triple Protocol Sections */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-stone-900 font-tajawal border-b pb-2">
                البروتوكول العلاجي المقترح لحالتك:
              </h3>

              {/* 1. Quran & Ruqyah */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <BookOpen className="w-5 h-5 text-amber-700" />
                  <span>أولاً: الرقية الشرعية والتداوي بالقرآن الموصى بها:</span>
                </div>
                <ul className="space-y-2">
                  {submittedInquiry.autoRecommendation?.quranVerses.map((verse, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-amber-950 font-amiri font-bold">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{verse}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Herbal Remedies */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <Leaf className="w-5 h-5 text-emerald-700" />
                  <span>ثانياً: الأعشاب الطبيعية والطب النبوي المساعد:</span>
                </div>
                <ul className="space-y-2">
                  {submittedInquiry.autoRecommendation?.recommendedHerbs.map((herb, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-950">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{herb}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Physiotherapy Advice */}
              <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-300 space-y-3">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <Activity className="w-5 h-5 text-teal-700" />
                  <span>ثالثاً: توجيهات العلاج الطبيعي والتأهيل الحركي:</span>
                </div>
                <ul className="space-y-2">
                  {submittedInquiry.autoRecommendation?.physioAdvice.map((advice, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-teal-950">
                      <span className="w-5 h-5 rounded-full bg-teal-200 text-teal-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prophetic tip */}
              <div className="p-4 rounded-xl bg-stone-900 text-amber-200 text-xs sm:text-sm flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="font-amiri leading-relaxed">
                  {submittedInquiry.autoRecommendation?.propheticMedicineTip}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <button
                onClick={() => setSubmittedInquiry(null)}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 underline"
              >
                طرح استفسار آخر جديد
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition-all"
              >
                حجز موعد كشف مباشر مع الأخصائي
              </button>
            </div>

          </div>
        ) : (
          /* Form Layout */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl mb-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Part 1: Patient Information */}
              <div>
                <h3 className="text-lg font-black text-stone-900 font-tajawal mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">1</span>
                  <span>البيانات الأساسية للمستشير</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="مثال: عبد الله أحمد"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:bg-white focus:outline-none text-sm text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      رقم الجوال (واتساب) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:bg-white focus:outline-none text-sm text-stone-900 text-left dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:bg-white focus:outline-none text-sm text-stone-900 text-left dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      العمر
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-none text-sm text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      الجنس
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setGender('male')}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-colors ${
                          gender === 'male'
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        ذكر
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('female')}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-colors ${
                          gender === 'female'
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        أنثى
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      مدة استمرار الأعراض
                    </label>
                    <select
                      value={symptomDuration}
                      onChange={(e) => setSymptomDuration(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-none text-sm text-stone-900"
                    >
                      <option value="few-days">أقل من أسبوع (ألم مفاجئ)</option>
                      <option value="1-3-months">من شهر إلى 3 أشهر</option>
                      <option value="6-months">من 3 إلى 6 أشهر</option>
                      <option value="chronic">أكثر من سنة (حالة مزمنة)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Part 2: Body Area and Symptoms */}
              <div className="pt-6 border-t border-stone-200">
                <h3 className="text-lg font-black text-stone-900 font-tajawal mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">2</span>
                  <span>المنطقة المتأثرة وطبيعة الشكوى</span>
                </h3>

                {/* Body part chips */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    حدد الموضع الرئيسي للألم أو العرض:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {bodyParts.map((bp) => (
                      <button
                        key={bp.id}
                        type="button"
                        onClick={() => setBodyPart(bp.id)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-right ${
                          bodyPart === bp.id
                            ? 'bg-emerald-800 text-white shadow-md'
                            : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        {bp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms multi-selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    اختر الأعراض التي تشعر بها (يمكنك اختيار أكثر من خيار):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSymptoms.map((sym) => {
                      const isChecked = selectedSymptoms.includes(sym);
                      return (
                        <button
                          key={sym}
                          type="button"
                          onClick={() => toggleSymptom(sym)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isChecked
                              ? 'bg-emerald-700 text-white shadow-sm'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          <span>{sym}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed description */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    شرح مفصل للحالة والأدوية أو الفحوصات السابقة (إن وجدت) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={conditionDescription}
                    onChange={(e) => setConditionDescription(e.target.value)}
                    placeholder="اكتب هنا تفاصيل شعورك بالألم، متى يزيد، هل خضعت لجراحة أو أشعة رنين؟ وهل تناولت أعشاباً معينة؟"
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:bg-white focus:outline-none text-sm text-stone-900 leading-relaxed"
                  />
                </div>
              </div>

              {/* Part 3: Preferred Approach */}
              <div className="pt-6 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  المسار العلاجي المفضل بالنسبة لك:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: 'شامل متكامل (فيزيائي + قرآني + عشبي)' },
                    { id: 'physiotherapy', label: 'علاج طبيعي وتأهيل فقط' },
                    { id: 'quran', label: 'تداوي بالقرآن ورقية فقط' },
                    { id: 'herbal', label: 'طب الأعشاب والبديل فقط' },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setPreferredApproach(app.id as any)}
                      className={`p-3 rounded-xl text-xs font-bold transition-all text-center ${
                        preferredApproach === app.id
                          ? 'bg-emerald-800 text-white shadow'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all hover:scale-101 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'جاري تحليل الأعراض...' : 'إرسال الاستفسار والحصول على الخطة العلاجية فوراً'}</span>
                </button>
                <p className="text-center text-xs text-stone-400 mt-2">
                  🔒 بياناتك سرية ومحمية وتخضع للسرية الطبية والشرعية التامة.
                </p>
              </div>

            </form>
          </div>
        )}

        {/* FAQs section */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-black text-stone-900 font-tajawal text-center mb-6">
            الأسئلة والاستفسارات الطبية والشرعية المتكررة
          </h3>
          {FAQs.map((faq, idx) => {
            const isOpen = faqExpanded === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setFaqExpanded(isOpen ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-stone-900 font-tajawal">
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
