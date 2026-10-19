import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Calendar, 
  Clock, 
  FileText, 
  Trash2, 
  Printer, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Leaf
} from 'lucide-react';
import { Appointment, TreatmentInquiry } from '../types';
import { cancelAppointment } from '../utils/storage';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  inquiries: TreatmentInquiry[];
  onRefresh: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  inquiries,
  onRefresh,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'inquiries'>('appointments');
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState<TreatmentInquiry | null>(null);

  if (!isOpen) return null;

  const handleCancelBooking = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟')) {
      cancelAppointment(id);
      onRefresh();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
        
        {/* Header */}
        <div className="sticky top-0 bg-stone-900 text-white p-5 rounded-t-3xl flex items-center justify-between border-b border-stone-800 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black font-tajawal text-white">
                سجل مواعيدي واستشاراتي
              </h3>
              <p className="text-xs text-stone-400">
                متابعة المواعيد والخطط العلاجية المحفوظة
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

        {/* Tab switcher */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('appointments');
              setSelectedInquiryDetail(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'appointments'
                ? 'bg-emerald-800 text-white shadow'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>المواعيد المحجوزة ({appointments.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('inquiries');
              setSelectedInquiryDetail(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-emerald-800 text-white shadow'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>الاستفسارات والخطط ({inquiries.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          
          {/* APPOINTMENTS TAB */}
          {activeTab === 'appointments' && (
            <div>
              {appointments.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Calendar className="w-12 h-12 text-stone-300 mx-auto" />
                  <p className="text-sm font-bold text-stone-600">لا توجد مواعيد محجوزة حالياً</p>
                  <p className="text-xs text-stone-400">يمكنك حجز موعد جديد في أي وقت وسيظهر في هذا السجل</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        apt.status === 'cancelled'
                          ? 'bg-stone-100 border-stone-300 opacity-60'
                          : 'bg-stone-50 border-emerald-200 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-stone-900 text-amber-300 font-bold px-2.5 py-1 rounded-lg">
                            {apt.bookingCode}
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {apt.status === 'confirmed' ? 'مؤكد' : 'ملغي'}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500">تم الحجز: {apt.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-800 mb-4">
                        <div>
                          <strong className="block text-stone-900 text-base font-tajawal mb-1">{apt.serviceName}</strong>
                          <span className="text-stone-600">المعالج: <strong>{apt.therapistName}</strong></span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-stone-700">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span>الموعد: <strong>{apt.date} • {apt.timeSlot}</strong></span>
                          </div>
                          <span className="text-stone-500 block mt-1">المريض: {apt.patientName}</span>
                        </div>
                      </div>

                      {apt.status === 'confirmed' && (
                        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                          <button
                            onClick={() => window.print()}
                            className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-bold"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>طباعة تفاصيل الموعد</span>
                          </button>

                          <button
                            onClick={() => handleCancelBooking(apt.id)}
                            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>إلغاء الموعد</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div>
              {selectedInquiryDetail ? (
                /* Detailed Protocol View */
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedInquiryDetail(null)}
                    className="text-xs text-emerald-700 font-bold hover:underline mb-2 block"
                  >
                    ← العودة لقائمة الاستفسارات
                  </button>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs bg-stone-900 text-amber-300 px-2.5 py-1 rounded-lg font-bold">
                        {selectedInquiryDetail.inquiryCode}
                      </span>
                      <span className="text-xs text-stone-500">{selectedInquiryDetail.createdAt}</span>
                    </div>
                    <h4 className="text-base font-black text-stone-900">
                      شكوى: {selectedInquiryDetail.bodyPart}
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-emerald-100">
                      "{selectedInquiryDetail.conditionDescription}"
                    </p>
                  </div>

                  {/* Recommendation preview */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                      <strong className="text-amber-900 block font-bold">الرقية والآيات الموصى بها:</strong>
                      {selectedInquiryDetail.autoRecommendation?.quranVerses.map((v, i) => (
                        <p key={i}>• {v}</p>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                      <strong className="text-emerald-900 block font-bold">الأعشاب الطبية المقترحة:</strong>
                      {selectedInquiryDetail.autoRecommendation?.recommendedHerbs.map((h, i) => (
                        <p key={i}>• {h}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <HelpCircle className="w-12 h-12 text-stone-300 mx-auto" />
                  <p className="text-sm font-bold text-stone-600">لا توجد استفسارات محفوظة حتى الآن</p>
                  <p className="text-xs text-stone-400">عند إرسال استفسار طبي يتم حفظه تلقائياً هنا مع خطتك العلاجية</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-400 shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs bg-stone-900 text-amber-300 font-bold px-2 py-0.5 rounded-md">
                          {inq.inquiryCode}
                        </span>
                        <span className="text-xs text-stone-500">{inq.createdAt}</span>
                      </div>

                      <h4 className="font-black text-stone-900 text-sm mb-1 font-tajawal">
                        المنطقة: {inq.bodyPart}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                        {inq.conditionDescription}
                      </p>

                      <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-700 font-bold">✓ تم إصدار البروتوكول العلاجي</span>
                        <button
                          onClick={() => setSelectedInquiryDetail(inq)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
                        >
                          عرض الخطة والآيات
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
