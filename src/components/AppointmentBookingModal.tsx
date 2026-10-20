import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  ArrowLeft,
  Activity,
  BookOpen,
  Flame,
  Video,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Appointment, Service, Therapist } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { THERAPISTS_DATA } from '../data/therapistsData';
import { saveAppointment } from '../utils/storage';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
  preselectedServiceId?: string;
  preselectedTherapistId?: string;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  onBookingComplete,
  preselectedServiceId,
  preselectedTherapistId,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [selectedService, setSelectedService] = useState<Service>(
    SERVICES_DATA.find((s) => s.id === preselectedServiceId) || SERVICES_DATA[0]
  );
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist>(
    THERAPISTS_DATA.find((t) => t.id === preselectedTherapistId) || THERAPISTS_DATA[0]
  );
  const [consultationType, setConsultationType] = useState<'clinic' | 'online' | 'home'>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('04:30 م');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female'>('male');
  const [patientAge, setPatientAge] = useState<number>(30);
  const [notes, setNotes] = useState('');

  // Result
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Sync props
  React.useEffect(() => {
    if (preselectedServiceId) {
      const match = SERVICES_DATA.find((s) => s.id === preselectedServiceId);
      if (match) setSelectedService(match);
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  // Generate date options for the upcoming 7 days
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('ar-SA', { weekday: 'long' }),
      formatted: d.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' }),
    };
  });

  const availableTimeSlots = [
    '09:00 ص',
    '10:30 ص',
    '11:45 ص',
    '04:30 م',
    '05:45 م',
    '07:00 م',
    '08:15 م',
    '09:30 م',
  ];

  const handleConfirmBooking = () => {
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('يرجى كتابة الاسم ورقم الجوال لتأكيد الحجز');
      return;
    }

    const bookingCode = `SHF-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalDate = selectedDate || availableDates[0].dateString;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      bookingCode,
      patientName,
      patientPhone,
      patientEmail,
      patientGender,
      patientAge,
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      therapistId: selectedTherapist.id,
      therapistName: selectedTherapist.name,
      date: finalDate,
      timeSlot: selectedTimeSlot,
      consultationType,
      notes,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString('ar-SA'),
    };

    saveAppointment(newAppointment);
    setConfirmedBooking(newAppointment);
    onBookingComplete();
  };

  const handlePrintPass = () => {
    window.print();
  };

  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Shifa Healthcare//Appointment//AR
BEGIN:VEVENT
SUMMARY:${confirmedBooking.serviceName} - ${confirmedBooking.therapistName}
DESCRIPTION:حجز في مركز الشفاء الطبيعي للعلاج الطبيعي والتداوي بالقرآن. رمز الحجز: ${confirmedBooking.bookingCode}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shifa_appointment_${confirmedBooking.bookingCode}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
        
        {/* Modal Top Header */}
        <div 
          className="sticky top-0 bg-stone-900 text-white p-5 rounded-t-3xl flex items-center justify-between border-b border-stone-800 z-10"
          style={{ backgroundColor: '#138713' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 
                className="text-lg font-black font-tajawal text-white"
                style={{ fontSize: '22px' }}
              >
                حجز موعد جلسة علاجية
              </h3>
              <p 
                className="text-xs text-stone-400"
                style={{ color: '#f5f5f5', fontWeight: 'bold', fontSize: '18px' }}
              >
                مركز الشفاء الطبيعي المعتمد
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          
          {/* Confirmed Screen */}
          {confirmedBooking ? (
            <div className="space-y-6 text-stone-800">
              
              {/* Pass Badge */}
              <div className="text-center p-6 rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-emerald-950 font-tajawal">
                  تم تأكيد حجز موعدك بنجاح!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  تم إدراجك في جدول المعالج وإرسال إشعار التأكيد، نسأل الله لك الشفاء التام والعافية.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-700 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <span className="text-xs text-emerald-400 font-bold">بطاقة موعد معتمد</span>
                  <span className="font-mono text-sm bg-stone-800 px-3 py-1 rounded-lg text-amber-300 font-bold">
                    {confirmedBooking.bookingCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-stone-400 block mb-0.5">اسم المريض:</span>
                    <strong className="text-base text-white">{confirmedBooking.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">الخدمة المطلوبة:</span>
                    <strong className="text-emerald-300">{confirmedBooking.serviceName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">المعالج المتخصص:</span>
                    <strong className="text-amber-200">{confirmedBooking.therapistName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">الموعد والتوقيت:</span>
                    <strong className="text-white">{confirmedBooking.date} • {confirmedBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">طريقة الحضور:</span>
                    <strong className="text-stone-200">
                      {confirmedBooking.consultationType === 'clinic' && 'حضوري بفرع المركز الرئيسي'}
                      {confirmedBooking.consultationType === 'online' && 'عن بعد (استشارة مرئية)'}
                      {confirmedBooking.consultationType === 'home' && 'تأهيل وزيارة منزلية'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">رقم التواصل:</span>
                    <strong className="text-stone-200 dir-ltr inline-block">{confirmedBooking.patientPhone}</strong>
                  </div>
                </div>

                {/* Important preparation instructions */}
                <div className="pt-3 border-t border-stone-800 text-xs text-stone-300 space-y-1">
                  <strong className="text-emerald-400 block mb-1">تعليمات التحضير للجلسة:</strong>
                  <p>• يُرجى الحضور قبل الموعد بـ 15 دقيقة، أو الاستعداد لرابط الاتصال المرئي.</p>
                  <p>• يُستحب الوضوء التام قبل جلسة الرقية والتداوي بالقرآن.</p>
                  <p>• يرجى إحضار أي تقارير طبية سابقة أو صور أشعة رنين للعمود الفقري والمفاصل.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintPass}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة البطاقة</span>
                  </button>

                  <button
                    onClick={handleDownloadICS}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>إضافة للتقويم</span>
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-md"
                >
                  إغلاق ومتابعة التصفح
                </button>
              </div>

            </div>
          ) : (
            /* Multi-step wizard */
            <div>
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 text-xs font-bold">
                {[
                  { num: 1, title: 'اختيار الخدمة' },
                  { num: 2, title: 'المعالج والمتخصص' },
                  { num: 3, title: 'الوقت والمكان' },
                  { num: 4, title: 'بيانات المريض' },
                ].map((s) => (
                  <div
                    key={s.num}
                    onClick={() => s.num < step && setStep(s.num)}
                    className={`flex items-center gap-2 cursor-pointer transition-colors ${
                      step === s.num
                        ? 'text-emerald-700'
                        : step > s.num
                        ? 'text-stone-700'
                        : 'text-stone-400'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step === s.num
                          ? 'bg-emerald-600 text-white font-black'
                          : step > s.num
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </span>
                    <span 
                      className="hidden sm:inline"
                      style={
                        s.num === 1 ? { fontSize: '15px', fontWeight: 'bold' } :
                        s.num === 2 ? { color: '#1e8313', fontSize: '15px' } :
                        s.num === 3 ? { fontSize: '15px', color: '#219315' } :
                        s.num === 4 ? { fontSize: '15px', color: '#20701a' } : undefined
                      }
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 
                    className="text-base font-black text-stone-900 font-tajawal"
                    style={{ color: '#196b19', fontSize: '21px', textAlign: 'center' }}
                  >
                    الخطوة 1: اختر نوع الجلسة العلاجية المطلوبة
                  </h4>
                  <div className="max-w-xl mx-auto">
                    {SERVICES_DATA.map((srv) => {
                      const isSelected = selectedService.id === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv)}
                          className={`p-6 sm:p-7 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/80 shadow-lg ring-2 ring-emerald-500/20'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                          }`}
                        >
                          <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-300">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{srv.categoryLabel}</span>
                            </div>

                            <h5 
                              className="font-black text-emerald-950 text-xl sm:text-2xl mb-2 font-tajawal"
                            >
                              {srv.title}
                            </h5>
                            
                            <p className="text-sm text-stone-700 leading-relaxed mb-4">
                              {srv.subtitle}
                            </p>

                            <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                              {srv.description}
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-700">
                            <span>{isSelected ? '✓ تم تحديد الجلسة' : 'انقر للاختيار'}</span>
                            <span className="text-stone-500 font-normal">مع فضيلة الشيخ عبد العلي</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Select Specialist */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-base font-black text-stone-900 font-tajawal text-center" style={{ color: '#196b19', fontSize: '21px' }}>
                    الخطوة 2: المعالج والمتخصص المشرف
                  </h4>
                  <div className="max-w-xl mx-auto">
                    {THERAPISTS_DATA.map((th) => {
                      const isSelected = selectedTherapist.id === th.id;
                      return (
                        <div
                          key={th.id}
                          onClick={() => setSelectedTherapist(th)}
                          className={`p-6 sm:p-7 rounded-3xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/80 shadow-lg ring-2 ring-emerald-500/20'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <span className="text-4xl sm:text-5xl p-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
                              {th.avatar}
                            </span>
                            <div>
                              <h5 className="font-black text-stone-900 text-lg sm:text-xl font-tajawal">
                                {th.name}
                              </h5>
                              <p className="text-xs sm:text-sm text-emerald-800 font-bold mb-1">
                                {th.title}
                              </p>
                              <span className="text-xs text-stone-500 font-medium">
                                خبرة {th.experienceYears} عاماً • تقييم ★ {th.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                            {th.specialty}
                          </p>

                          <div className="space-y-2 mb-4 bg-white/80 p-3.5 rounded-2xl border border-stone-200 text-xs text-stone-600">
                            <strong className="text-emerald-800 block">المؤهلات والاعتمادات:</strong>
                            {th.qualifications.map((q, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="text-emerald-600">✓</span>
                                <span>{q}</span>
                              </div>
                            ))}
                          </div>

                          <div className="text-xs text-emerald-800 font-bold bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-300">
                            أيام التواجد: {th.availableDays.join('، ')}
                          </div>

                          <div className="mt-4 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-700">
                            <span>{isSelected ? '✓ تم تحديد المعالج' : 'انقر للاختيار'}</span>
                            <span className="text-stone-500 font-normal">المتخصص الحصري للعلاج بالقرآن</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Date, Time & Consultation Type */}
              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="text-base font-black text-stone-900 font-tajawal">
                    الخطوة 3: تحديد التوقيت ونمط الحضور
                  </h4>

                  {/* Consultation Type Radio */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      مكان أو طريقة الجلسة:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'clinic', label: 'حضوري بالمركز', icon: MapPin },
                        { id: 'online', label: 'عن بعد (مرئي)', icon: Video },
                        { id: 'home', label: 'زيارة منزلية', icon: Activity },
                      ].map((type) => {
                        const Icon = type.icon;
                        const isSelected = consultationType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setConsultationType(type.id as any)}
                            className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                              isSelected
                                ? 'bg-emerald-800 text-white shadow-md'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Dates */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      اختر اليوم المناسب:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {availableDates.map((item, i) => {
                        const isSelected = (selectedDate || availableDates[0].dateString) === item.dateString;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedDate(item.dateString)}
                            className={`p-2.5 rounded-xl text-center transition-all ${
                              isSelected
                                ? 'bg-emerald-700 text-white shadow font-bold'
                                : 'bg-stone-50 text-stone-700 hover:bg-stone-200 border border-stone-200 text-xs'
                            }`}
                          >
                            <span className="block text-[11px] opacity-80">{item.dayName}</span>
                            <span className="block text-sm font-bold">{item.formatted}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Time Slots */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      الفترات الزمنية المتاحة:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {availableTimeSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-stone-900 text-white shadow-md'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 4: Patient Details */}
              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-base font-black text-stone-900 font-tajawal">
                    الخطوة 4: بيانات المريض وتأكيد الحجز
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        اسم المريض الكامل *
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="مثال: محمد بن عبد العزيز"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        رقم الجوال لتأكيد الحجز *
                      </label>
                      <input
                        type="tel"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="05XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-none text-sm text-left dir-ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        العمر والجنس
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={patientAge}
                          onChange={(e) => setPatientAge(Number(e.target.value))}
                          className="w-24 px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setPatientGender('male')}
                          className={`flex-1 rounded-xl text-xs font-bold ${
                            patientGender === 'male' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          ذكر
                        </button>
                        <button
                          type="button"
                          onClick={() => setPatientGender('female')}
                          className={`flex-1 rounded-xl text-xs font-bold ${
                            patientGender === 'female' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          أنثى
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        البريد الإلكتروني (لتلقي التذكير)
                      </label>
                      <input
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="patient@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-none text-sm text-left dir-ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      ملاحظات أو وصف موجز للشكوى والألم
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: أعاني من ألم في أسفل الظهر يمتد للساق اليسرى منذ شهرين..."
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:outline-none text-sm"
                    />
                  </div>

                  {/* Summary recap */}
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <strong>الخدمة:</strong> {selectedService.title} ({selectedService.price} {selectedService.currency})
                    </div>
                    <div>
                      <strong>المعالج:</strong> {selectedTherapist.name}
                    </div>
                    <div>
                      <strong>الموعد:</strong> {selectedDate || availableDates[0].formatted} - {selectedTimeSlot}
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-stone-200 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-black transition-all shadow-lg shadow-emerald-950/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأكيد الحجز النهائي</span>
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
