import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HerbalSearchEngine } from './components/HerbalSearchEngine';
import { PhysiotherapySection } from './components/PhysiotherapySection';
import { QuranTherapySection } from './components/QuranTherapySection';
import { TreatmentInquirySection } from './components/TreatmentInquirySection';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Footer } from './components/Footer';
import { 
  getSavedAppointments, 
  getSavedInquiries, 
  getFavoriteHerbs, 
  toggleFavoriteHerb 
} from './utils/storage';
import { Appointment, TreatmentInquiry } from './types';
import { CheckCircle2, Phone, Calendar, Search, HelpCircle, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState<boolean>(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedTherapistId, setPreselectedTherapistId] = useState<string | undefined>(undefined);
  
  // Herbal Search query propagated from Hero
  const [herbalSearchQuery, setHerbalSearchQuery] = useState<string>('');
  const [prefilledInquiryHerb, setPrefilledInquiryHerb] = useState<string | undefined>(undefined);

  // Storage states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<TreatmentInquiry[]>([]);
  const [favoriteHerbs, setFavoriteHerbs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshData = () => {
    setAppointments(getSavedAppointments());
    setInquiries(getSavedInquiries());
    setFavoriteHerbs(getFavoriteHerbs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenBooking = (serviceId?: string, therapistId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedTherapistId(therapistId);
    setIsBookingModalOpen(true);
  };

  const handleOpenInquiry = (herbName?: string) => {
    if (herbName) {
      setPrefilledInquiryHerb(herbName);
    }
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHerbsSearchFromHero = (term: string) => {
    setHerbalSearchQuery(term);
    setActiveSection('herbs');
  };

  const handleToggleFavorite = (herbId: string) => {
    const updated = toggleFavoriteHerb(herbId);
    setFavoriteHerbs(updated);
    const isNowFav = updated.includes(herbId);
    showToast(isNowFav ? 'تمت إضافة العشبة للمفضلة بنجاح' : 'تمت إزالة العشبة من المفضلة');
  };

  const handleBookingCompleted = () => {
    refreshData();
    showToast('تم تأكيد حجز موعدك بنجاح! يمكنك مراجعته في سجل مواعيدي');
  };

  const handleInquirySaved = () => {
    refreshData();
    showToast('تم استلام استفسارك وإصدار الخطة الاستشفائية بنجاح');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900" dir="rtl">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200 text-xs sm:text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenInquiry={() => handleOpenInquiry()}
        onOpenMyBookings={() => setIsMyBookingsModalOpen(true)}
        bookingsCount={appointments.filter(a => a.status === 'confirmed').length}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenInquiry={() => handleOpenInquiry()}
          onSearchHerbs={handleHerbsSearchFromHero}
          onNavigateSection={(secId) => {
            setActiveSection(secId);
            const el = document.getElementById(secId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Herbal Search Engine & Encyclopedia */}
        <HerbalSearchEngine
          initialSearchQuery={herbalSearchQuery}
          favoriteHerbs={favoriteHerbs}
          onToggleFavorite={handleToggleFavorite}
          onOpenConsultationForHerb={(herbName) => handleOpenInquiry(herbName)}
        />

        {/* 3. Physiotherapy & Rehabilitation */}
        <PhysiotherapySection
          onOpenBookingForPhysio={() => handleOpenBooking('quran-therapy', 'sheikh-qahtani')}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* 4. Quran Therapy & Ruqyah */}
        <QuranTherapySection
          onOpenBookingForRuqyah={() => handleOpenBooking('quran-therapy', 'sheikh-qahtani')}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* 5. Treatment Consultation & Inquiry */}
        <TreatmentInquirySection
          prefilledHerb={prefilledInquiryHerb}
          onOpenBooking={() => handleOpenBooking()}
          onInquirySaved={handleInquirySaved}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(secId) => {
          setActiveSection(secId);
          const el = document.getElementById(secId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Modals */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingComplete={handleBookingCompleted}
        preselectedServiceId={preselectedServiceId}
        preselectedTherapistId={preselectedTherapistId}
      />

      <MyBookingsModal
        isOpen={isMyBookingsModalOpen}
        onClose={() => setIsMyBookingsModalOpen(false)}
        appointments={appointments}
        inquiries={inquiries}
        onRefresh={refreshData}
      />

      {/* Floating Action Button (Quick Appointment / WhatsApp) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/212719242064"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center border-2 border-white hover:scale-105 active:scale-95 transition-all shadow-emerald-950/40"
          title="محادثة مباشرة عبر واتساب"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="w-13 h-13 sm:w-14 sm:h-14 sm:hidden rounded-full bg-stone-900 text-white shadow-2xl flex items-center justify-center border-2 border-white hover:scale-105 active:scale-95 transition-transform"
          title="حجز موعد فوري"
        >
          <Calendar className="w-6 h-6 text-emerald-400" />
        </button>
      </div>

    </div>
  );
}
