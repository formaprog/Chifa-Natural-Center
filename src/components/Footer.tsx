import { HeartHandshake, Phone, Mail, MapPin, Clock, ShieldCheck, BookOpen, Activity, Leaf, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenInquiry,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-emerald-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white font-tajawal">
                  مركز
                </span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 font-tajawal">
                  الشِّــفَـاء
                </span>
                <span className="text-xl font-black text-white font-tajawal">
                  الطبيعي والتداوي بالقرآن
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-tajawal">
              المنصة الطبية والشرعية الأولى التي تجمع بين العلاج الطبيعي والتأهيل الحركي الحديث، وبركات التداوي بالقرآن والرقية الشرعية، وصيدلية الأعشاب الطبية الموثقة.
            </p>

            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-amber-200/90 font-amiri">
              «اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ»
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base font-tajawal border-b border-stone-800 pb-2">
              الأقسام الرئيسية
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('herbs')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                  <span>محرك بحث الأعشاب ومنافعها</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('physio')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-teal-500" />
                  <span>قسم العلاج الطبيعي والتأهيل الحركي</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quran')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>التداوي بالقرآن والرقية الشرعية</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInquiry}
                  className="hover:text-emerald-400 transition-colors"
                >
                  الإستفسار عن العلاج وتشخيص الحالة
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-emerald-400 transition-colors"
                >
                  حجز موعد جلسة علاجية
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles & Integrity */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base font-tajawal border-b border-stone-800 pb-2">
              ضوابط وأمانة الرعاية
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>أطباء علاج طبيعي مرخصون وهيئة استشارية شرعية معتمدة.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>التزام تام بالسنة النبوية ونبذ الخرافات والدجل والشعوذة.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>أعشاب طبيعية خالية من أي شوائب مع تحديد الجرعات الدقيقة.</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Clinic Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base font-tajawal border-b border-stone-800 pb-2">
              التواصل والاستقبال
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <a 
                href="https://wa.me/212719242064"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
                title="تواصل عبر واتساب"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>واتساب:</span>
                <span className="dir-ltr font-mono text-stone-200 underline decoration-emerald-500/60">+212719242064</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">contact@shifa-healing.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>المركز الرئيسي: حي النرجس، طريق الملك سلمان، الرياض</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>يومياً من 08:00 صباحاً حتى 10:00 مساءً</span>
              </div>
            </div>
          </div>

        </div>

        {/* Medical and Sharia Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800/80 text-[11px] text-stone-500 leading-relaxed text-center mb-8">
          <strong>إخلاء مسؤولية طبية وشرعية:</strong> المعلومات الواردة في هذا الموقع تهدف إلى التثقيف الصحي والشرعي والتأهيلي، ولا تعد بديلاً عن الطوارئ الطبية الحرجة أو استشارة الطبيب المختص قبل البدء بأي برنامج علاجي جديد أو تناول أعشاب في حال وجود أمراض مزمنة كالفشل الكلوي أو الحالات الجراحية العاجلة.
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} مركز الشفاء الطبيعي والتداوي بالقرآن للعلاج الطبيعي والأعشاب. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">سياسة الخصوصية</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">الشروط والأحكام</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">ميثاق التداوي النبوي</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
