import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  CheckCircle, 
  Heart, 
  HelpCircle, 
  ShieldCheck, 
  Clock,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  HEALING_VERSES, 
  CORE_RUQYAH, 
  PROPHETIC_SUPPLICATIONS, 
  HEALING_PROTOCOLS_GUIDE 
} from '../data/ruqyahData';
import { RuqyahItem } from '../types';

interface QuranTherapySectionProps {
  onOpenBookingForRuqyah: () => void;
  onOpenInquiry: () => void;
}

export const QuranTherapySection: React.FC<QuranTherapySectionProps> = ({
  onOpenBookingForRuqyah,
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'shifa-verses' | 'core-ruqyah' | 'prophetic-dua' | 'guide'>('shifa-verses');
  const [counters, setCounters] = useState<Record<string, number>>({});

  const handleIncrementCounter = (id: string, max: number) => {
    setCounters((prev) => {
      const current = prev[id] || 0;
      const next = current + 1;
      return {
        ...prev,
        [id]: next > max ? 0 : next,
      };
    });
  };

  const handleResetCounter = (id: string) => {
    setCounters((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  return (
    <section id="quran" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden border-b border-emerald-900/30">
      
      {/* Background ambient Islamic patterns and glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/40 text-amber-300 text-xs sm:text-sm font-bold mb-4 border border-amber-600/40">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>الشفاء الرباني والطب النبوي المؤصل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-tajawal mb-4">
            التداوي بالقرآن والرقية الشرعية
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-tajawal leading-relaxed">
            القرآن الكريم شفاء تام لأدواء القلوب والأبدان، ونحن نعتمد الرقية الشرعية المأثورة الخالصة من كل بدعة أو خرافة، وفق كتاب الله وسنة رسوله ﷺ.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'shifa-verses', label: 'آيات الشفاء الستة', icon: Heart },
            { id: 'core-ruqyah', label: 'أمهات الرقية الشرعية', icon: BookOpen },
            { id: 'prophetic-dua', label: 'الأدعية النبوية المأثورة', icon: Sparkles },
            { id: 'guide', label: 'بروتوكول التداوي العملي', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isCurrent
                    ? 'bg-amber-500/20 text-amber-300 border-2 border-amber-400/80 shadow-lg shadow-amber-950/50'
                    : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: 6 Healing Verses */}
        {activeTab === 'shifa-verses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HEALING_VERSES.map((item) => {
                const count = counters[item.id] || 0;
                const isCompleted = count >= item.repeatCount;

                return (
                  <div
                    key={item.id}
                    className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 relative flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-emerald-950/50 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                        : 'bg-stone-800/70 border-stone-700 hover:border-amber-500/50'
                    }`}
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800/60">
                          {item.surahOrSource}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-amber-200 mb-3 font-tajawal">
                        {item.title}
                      </h3>

                      {/* Quran Calligraphy Text */}
                      <div className="my-5 p-5 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-center">
                        <p className="font-amiri text-xl sm:text-2xl text-amber-100 font-bold leading-loose select-all tracking-wide">
                          ﴿ {item.textArabic} ﴾
                        </p>
                      </div>

                      {/* Spiritual purpose */}
                      <div className="text-xs sm:text-sm text-stone-300 space-y-1 mb-4">
                        <strong className="text-amber-300 block">غاية الاستشفاء:</strong>
                        <p>{item.purpose}</p>
                      </div>
                    </div>

                    {/* Counter Footer (Tally Counter) */}
                    <div className="pt-4 border-t border-stone-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleIncrementCounter(item.id, item.repeatCount)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            {isCompleted ? 'اكتمل التكرار (7/7)' : `تكرار: ${count} / ${item.repeatCount}`}
                          </span>
                        </button>

                        {count > 0 && (
                          <button
                            onClick={() => handleResetCounter(item.id)}
                            className="p-2 rounded-xl bg-stone-700/60 text-stone-400 hover:text-white"
                            title="إعادة ضبط العداد"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <span className="text-[11px] text-stone-400 font-tajawal">
                        يُستحب تكرارها 7 مرات بيقين
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Core Ruqyah Verses */}
        {activeTab === 'core-ruqyah' && (
          <div className="space-y-6">
            {CORE_RUQYAH.map((item) => {
              const count = counters[item.id] || 0;
              const isCompleted = count >= item.repeatCount;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 sm:p-8 bg-stone-800/80 border border-stone-700 hover:border-amber-500/50 shadow-lg space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60 mb-2 inline-block">
                        {item.surahOrSource}
                      </span>
                      <h3 className="text-xl font-black text-white font-tajawal">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleIncrementCounter(item.id, item.repeatCount)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                        }`}
                      >
                        {isCompleted ? 'تم التكرار بنجاح' : `تكرار: ${count} / ${item.repeatCount}`}
                      </button>
                    </div>
                  </div>

                  {/* Quran Arabic Vocalized Text */}
                  <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-center">
                    <p className="font-amiri text-lg sm:text-2xl text-amber-100 font-bold leading-loose select-all tracking-wide whitespace-pre-line">
                      {item.textArabic}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-2 border-t border-stone-700">
                    <div className="bg-stone-900/50 p-3 rounded-xl border border-stone-700">
                      <strong className="text-amber-300 block mb-1">المقصد والشفاء:</strong>
                      <p className="text-stone-300">{item.purpose}</p>
                    </div>
                    {item.hadithVirtue && (
                      <div className="bg-stone-900/50 p-3 rounded-xl border border-stone-700">
                        <strong className="text-amber-300 block mb-1">الفضل من الحديث الشريف:</strong>
                        <p className="text-stone-300 font-amiri">{item.hadithVirtue}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: Prophetic Supplications */}
        {activeTab === 'prophetic-dua' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROPHETIC_SUPPLICATIONS.map((item) => {
              const count = counters[item.id] || 0;
              const isCompleted = count >= item.repeatCount;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 bg-stone-800/80 border border-stone-700 hover:border-amber-500/50 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-lg border border-amber-800/60">
                        {item.surahOrSource}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-3 font-tajawal">
                      {item.title}
                    </h3>

                    <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-700 text-center my-4">
                      <p className="font-amiri text-lg text-amber-100 font-bold leading-relaxed">
                        « {item.textArabic} »
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-stone-300 mb-4">
                      <p><strong className="text-amber-300">طريقة الرقية:</strong> {item.purpose}</p>
                      {item.hadithVirtue && (
                        <p className="text-stone-400 font-amiri">{item.hadithVirtue}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-700 flex items-center justify-between">
                    <button
                      onClick={() => handleIncrementCounter(item.id, item.repeatCount)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                      }`}
                    >
                      {isCompleted ? 'اكتمل التكرار' : `تكرار الدعاء: ${count} / ${item.repeatCount}`}
                    </button>
                    <span className="text-xs text-stone-400">سنة نبوية مأثورة</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: Practical Guide & Prophetic Protocol */}
        {activeTab === 'guide' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            
            {/* Step by step cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HEALING_PROTOCOLS_GUIDE.map((step) => (
                <div key={step.step} className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-black text-lg">
                      {step.step}
                    </div>
                    <h3 className="text-base font-bold text-white font-tajawal">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-stone-900/60 p-2.5 rounded-xl border border-stone-700/80 text-xs text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{step.tip}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sunnah vs Charlatanism Disclaimer (ضوابط الرقية الشرعية والتحذير من الدجل) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 to-stone-900 border-2 border-emerald-600/50 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base sm:text-lg font-tajawal">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>ضوابط الرقية الشرعية المعتمدة في مركز الشفاء الطبيعي:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>أن تكون بكلام الله تعالى وأسمائه وصفاته وبكلام رسوله ﷺ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>أن تكون باللسان العربي الواضح الخالي من الطلاسم أو التمتمات المجهولة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>الاعتقاد الجازم بأن الرقية سبب لا تؤثر بذاتها بل بإذن الله وشفاؤه.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>لا نسأل أبداً عن اسم الأم، ولا نستخدم البخور السحري أو الحروز الشركية.</span>
                </li>
              </ul>
            </div>

          </div>
        )}

        {/* Section Bottom CTA Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-stone-800 to-emerald-950/60 border border-amber-600/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-right">
            <h4 className="text-xl font-black text-white font-tajawal">
              هل ترغب في جلسة رقية شرعية خاصة مع الشيخ؟
            </h4>
            <p className="text-stone-300 text-xs sm:text-sm">
              نوفر جلسات حضورية بالمركز أو عن بُعد عبر الاتصال المرئي مع المتابعة المستمرة لبرنامج الشفاء.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBookingForRuqyah}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/50 transition-all hover:scale-102"
            >
              حجز جلسة رقية شرعية
            </button>
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm border border-stone-600 transition-colors"
            >
              استفسار عن الأعراض
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
