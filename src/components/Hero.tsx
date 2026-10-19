import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  BookOpen, 
  Leaf, 
  CheckCircle2, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenInquiry: () => void;
  onSearchHerbs: (term: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenInquiry,
  onSearchHerbs,
  onNavigateSection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchHerbs(searchTerm.trim());
      const el = document.getElementById('herbs');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickSearches = ['الحبة السوداء', 'القسط الهندي', 'آلام المفاصل', 'عرق النسا', 'القولون العصبي', 'الأرق والتوتر'];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950/70 to-stone-900 text-stone-100 py-16 sm:py-24 border-b border-emerald-900/30">
      
      {/* Background ambient lighting and decorative orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Quranic Verse Banner with Islamic Calligraphy vibe */}
        <div className="flex justify-center mb-8">
          <div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-sm shadow-inner backdrop-blur-sm"
            style={{ width: '378.913px', height: '68.6px' }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-amiri text-base sm:text-lg tracking-wide text-amber-100">
              ﴿ وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ ﴾
            </span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-tajawal leading-tight sm:leading-tight">
            مركز <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">الشِّــفَـاء</span> الطبيعي والتداوي بالقرآن
            <br />
            <span className="text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-200">
              للعلاج الطبيعي والتداوي بالقرآن والطب النبوي
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto font-tajawal">
            نجمع بحكمة بين أحدث بروتوكولات <strong className="text-emerald-300 font-bold">العلاج الطبيعي والتأهيل الحركي</strong>،
            وبركات <strong className="text-amber-300 font-bold">الرقية الشرعية والتداوي بالقرآن</strong>،
            مع أكبر محرك بحث موسوعي في <strong className="text-emerald-300 font-bold">الأعشاب الطبية والطب البديل</strong> تحت إشراف نخبة من المتخصصين.
          </p>

          {/* Quick Search Bar right on Hero */}
          <div className="pt-4 max-w-2xl mx-auto">
            <form onSubmit={handleHeroSearchSubmit} className="relative flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن عشبة أو علاج لمرض معين (مثلاً: القسط الهندي، الديسك، القولون...)"
                  className="w-full pl-32 pr-12 py-4 rounded-2xl bg-stone-900/90 text-white placeholder-stone-400 border-2 border-emerald-600/50 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-2xl text-sm sm:text-base transition-all"
                />
                <Search className="w-5 h-5 text-emerald-400 absolute right-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>بحث</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-stone-400">
              <span className="text-stone-400">شائع البحث:</span>
              {quickSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchTerm(tag);
                    onSearchHerbs(tag);
                    const el = document.getElementById('herbs');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-emerald-900/60 text-stone-300 hover:text-emerald-200 border border-stone-700/60 hover:border-emerald-600/60 transition-colors text-xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-emerald-950/70 border border-emerald-400/40 hover:scale-102 transition-all duration-200"
            >
              <Calendar className="w-5 h-5 text-emerald-100" />
              <span>حجز موعد جلسة علاجية</span>
            </button>

            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-stone-800/90 hover:bg-stone-700/90 text-stone-100 font-bold text-base border border-stone-600/60 hover:border-emerald-500 shadow-lg transition-all duration-200"
            >
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <span>إرسال استفسار وتشخيص فوري</span>
            </button>
          </div>

          {/* Trust Factors / Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-stone-300 border-t border-stone-800/80 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>أطباء ورُقاة معتمدون</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>رقية شرعية وفق السنة</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تأهيل فيزيائي متقدم</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>أعشاب موثقة علمياً</span>
            </div>
          </div>

        </div>

        {/* 3 Core Pillars Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Physiotherapy */}
          <div 
            onClick={() => onNavigateSection('physio')}
            className="group cursor-pointer p-6 rounded-3xl bg-gradient-to-b from-stone-800/80 to-stone-900/90 border border-stone-700/60 hover:border-emerald-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/40 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              الجانب العضوي والحركي
            </span>
            <h3 className="text-xl font-bold text-white mb-2 font-tajawal group-hover:text-emerald-300 transition-colors">
              العلاج الطبيعي والتأهيل
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              برامج تخصصية لعلاج آلام العمود الفقري، الانزلاق الغضروفي، خشونة الركبة، والكتف، مع تمارين علاجية موجهة ومخططات تأهيل منزلية.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:gap-3 transition-all">
              <span>استكشف التمارين والحالات</span>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 2: Quran Therapy */}
          <div 
            onClick={() => onNavigateSection('quran')}
            className="group cursor-pointer p-6 rounded-3xl bg-gradient-to-b from-stone-800/80 to-stone-900/90 border border-stone-700/60 hover:border-amber-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/40 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              الشفاء القرآني والإيماني
            </span>
            <h3 className="text-xl font-bold text-white mb-2 font-tajawal group-hover:text-amber-300 transition-colors">
              الرقية والتداوي بالقرآن
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              آيات الشفاء الست، الرقية الشرعية الشاملة، مشغل صوتي تفاعلي، إرشادات التداوي بالماء وزيت الزيتون المقروء عليه، وأدعية السنة النبوية الصحيحة.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:gap-3 transition-all">
              <span>استمع واقرأ آيات الشفاء</span>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 3: Herbal Search Engine */}
          <div 
            onClick={() => onNavigateSection('herbs')}
            className="group cursor-pointer p-6 rounded-3xl bg-gradient-to-b from-stone-800/80 to-stone-900/90 border border-stone-700/60 hover:border-teal-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/40 relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Leaf className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
              صيدلية الطبيعة والطب النبوي
            </span>
            <h3 className="text-xl font-bold text-white mb-2 font-tajawal group-hover:text-teal-300 transition-colors">
              محرك بحث الأعشاب ومنافعها
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">
              دليل ذكي شامل للأعشاب الطبية، منافعها الصحية، جرعاتها الدقيقة، طرق التحضير، وموانع الاستعمال، مع مولد الوصفات العشبية التوليفية.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 group-hover:gap-3 transition-all">
              <span>تصفح موسوعة الأعشاب</span>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
