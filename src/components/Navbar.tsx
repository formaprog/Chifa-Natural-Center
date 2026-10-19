import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Calendar, 
  HelpCircle, 
  BookOpen, 
  Activity, 
  Menu, 
  X, 
  PhoneCall,
  Bookmark,
  MessageCircle
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenInquiry: () => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenInquiry,
  onOpenMyBookings,
  bookingsCount,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'الرئيسية', icon: HeartHandshake },
    { id: 'herbs', label: 'محرك بحث الأعشاب', icon: Search },
    { id: 'physio', label: 'العلاج الطبيعي', icon: Activity },
    { id: 'quran', label: 'التداوي بالقرآن والرقية', icon: BookOpen },
    { id: 'inquiry', label: 'استفسار عن العلاج', icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-emerald-900/40 shadow-lg">
      {/* Top emergency & prophetic quote ticker bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/30 text-emerald-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-amiri text-sm">
              قال رسول الله ﷺ: «مَا أَنْزَلَ اللَّهُ دَاءً إِلَّا أَنْزَلَ لَهُ شِفَاءً» [صحيح البخاري]
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-tajawal">
            <a 
              href="https://wa.me/212719242064"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors"
              title="تواصل مباشرة عبر واتساب"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#ffffff' }}>رقم الواتساب:</span> <strong className="text-white dir-ltr underline decoration-emerald-500/50 hover:decoration-emerald-400" style={{ fontSize: '18px' }}>+212719242064</strong>
            </a>
            <span className="text-stone-400">|</span>
            <span className="text-stone-300">أوقات العمل: يومياً من 8:00 ص - 10:00 م</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-900/40 border border-emerald-400/30 group-hover:scale-105 transition-transform duration-300">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-white font-tajawal">
                  مركز
                </span>
                <span className="text-lg sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 font-tajawal">
                  الشِّــفَـاء
                </span>
                <span className="text-lg sm:text-2xl font-black tracking-tight text-white font-tajawal">
                  الطبيعي والتداوي بالقرآن
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light font-tajawal hidden sm:block">
                العلاج الطبيعي • التداوي بالقرآن • طب الأعشاب والنبوي
              </p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-800/60 text-emerald-300 shadow-sm border border-emerald-600/50'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2.5">
            {/* My Bookings Button */}
            <button
              onClick={onOpenMyBookings}
              className="relative p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 hover:text-white border border-stone-700/60 transition-colors"
              title="سجل مواعيدي واستفساراتي"
            >
              <Bookmark className="w-5 h-5 text-emerald-400" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-stone-900 text-xs font-bold rounded-full flex items-center justify-center animate-bounce shadow">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Inquire Button */}
            <button
              onClick={onOpenInquiry}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-emerald-600 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>استفسار عن علاج</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/50 border border-emerald-400/30 hover:scale-102 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>حجز موعد</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenInquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-800 text-stone-200 font-medium border border-stone-700"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>استفسار عن العلاج وتشخيص الحالة</span>
            </button>
            <button
              onClick={() => {
                onOpenMyBookings();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-800 text-stone-200 font-medium border border-stone-700"
            >
              <Bookmark className="w-4 h-4 text-emerald-400" />
              <span>مواعيدي واستفساراتي المحفوظة ({bookingsCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
