import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Calendar,
  Flame,
  Shield,
  Layers
} from 'lucide-react';
import { PHYSIO_EXERCISES_DATA } from '../data/exercisesData';
import { PhysioExercise } from '../types';

interface PhysiotherapySectionProps {
  onOpenBookingForPhysio: () => void;
  onOpenInquiry: () => void;
}

export const PhysiotherapySection: React.FC<PhysiotherapySectionProps> = ({
  onOpenBookingForPhysio,
  onOpenInquiry,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [activeExercise, setActiveExercise] = useState<PhysioExercise>(PHYSIO_EXERCISES_DATA[0]);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState<number>(PHYSIO_EXERCISES_DATA[0].durationSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  useEffect(() => {
    setTimeLeft(activeExercise.durationSeconds);
    setIsTimerRunning(false);
    setTimerFinished(false);
  }, [activeExercise]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTimerFinished(true);
      // Play brief ding chime if audio context allowed
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 659.25; // E5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } catch {}
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(activeExercise.durationSeconds);
      setTimerFinished(false);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(activeExercise.durationSeconds);
    setTimerFinished(false);
  };

  const filteredExercises = PHYSIO_EXERCISES_DATA.filter((ex) => {
    if (selectedTarget === 'all') return true;
    return ex.targetAreaId === selectedTarget;
  });

  return (
    <section id="physio" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm font-bold mb-4 border border-teal-300">
            <Activity className="w-4 h-4 text-teal-700" />
            <span>التأهيل الحركي والطب الطبيعي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 font-tajawal mb-4">
            قسم العلاج الطبيعي والتأهيل الحركي
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-tajawal">
            برامج علاجية تستهدف جذور الألم من خلال العلاج اليدوي، وتقويم العمود الفقري، والتمارين العلاجية الموجهة علمياً لاستعادة الحركة بدون جراحة.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'كافة التمارين' },
            { id: 'back', label: 'أسفل الظهر والديسك' },
            { id: 'neck', label: 'الرقبة وتحدب الأكتاف' },
            { id: 'knee', label: 'خشونة الركبة والمفاصل' },
            { id: 'shoulder', label: 'الكتف المتجمد والأبهر' },
            { id: 'spine', label: 'عرق النسا والحوض' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTarget(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedTarget === item.id
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Interactive Exercise Studio (Left: List, Right: Live Exercise Coach) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Exercises Selection List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-lg font-black text-stone-900 font-tajawal mb-3 flex items-center justify-between">
              <span>قائمة التمارين العلاجية المعتمدة</span>
              <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md">
                {filteredExercises.length} تمرين
              </span>
            </h3>

            {filteredExercises.map((ex) => {
              const isSelected = activeExercise.id === ex.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => setActiveExercise(ex)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-700 shadow-lg scale-101'
                      : 'bg-white text-stone-800 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {ex.difficulty}
                      </span>
                      <span className={`text-xs ${isSelected ? 'text-emerald-300' : 'text-stone-500'}`}>
                        {ex.targetArea}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base">
                      {ex.title}
                    </h4>
                    <p className={`text-xs ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                      التكرار: {ex.repetitions}
                    </p>
                  </div>

                  <ChevronRight className={`w-5 h-5 rotate-180 ${isSelected ? 'text-emerald-300' : 'text-stone-400'}`} />
                </div>
              );
            })}
          </div>

          {/* Active Exercise Live Player & Coach (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block mb-1">
                  المنطقة المستهدفة: {activeExercise.targetArea}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-tajawal">
                  {activeExercise.title}
                </h3>
              </div>

              {/* Repetitions Badge */}
              <div className="bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700">
                {activeExercise.repetitions}
              </div>
            </div>

            {/* Live Interactive Timer Widget */}
            <div className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              
              <div className="flex items-center gap-4">
                {/* Circular timer count */}
                <div className="relative w-20 h-20 rounded-full bg-stone-800 border-4 border-emerald-500 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-black font-mono">
                    {timeLeft}s
                  </span>
                </div>
                <div>
                  <span className="text-xs text-stone-300 block">عداد التمرين التفاعلي</span>
                  <strong className="text-base font-tajawal text-emerald-300">
                    {timerFinished ? 'أحسنت! اكتمل وقت التمرين' : isTimerRunning ? 'التمرين قيد التنفيذ...' : 'جاهز للبدء'}
                  </strong>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md ${
                    isTimerRunning
                      ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'إيقاف مؤقت' : timerFinished ? 'إعادة التمرين' : 'بدء المؤقت'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                  title="إعادة ضبط المؤقت"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Step-by-step Execution Instructions */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-stone-900 font-tajawal">
                خطوات أداء التمرين بدقة وأمان:
              </h4>
              <div className="space-y-2">
                {activeExercise.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Precautions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                  <CheckCircle className="w-4 h-4 text-teal-700" />
                  <span>الفائدة العلاجية:</span>
                </div>
                <p className="text-xs text-teal-800 leading-relaxed">
                  {activeExercise.benefits}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>تنبيه وإرشادات الأمان:</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {activeExercise.cautions.join(' ')}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Clinical Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'تأهيل العمود الفقري والديسك',
              desc: 'بروتوكولات حديثة لتخفيف الضغط الغضروفي وتوسيع القناة العصبية دون تدخل جراحي.',
              icon: '🦴'
            },
            {
              title: 'تأهيل خشونة المفاصل',
              desc: 'تمارين تقوية متساوية القياس (Isometric) مع دهان زيت الزيتون والكركم المركز.',
              icon: '🦵'
            },
            {
              title: 'الإبر الجافة وعلاج الأبهر',
              desc: 'تحرير نقاط الزناد العضلية (Trigger Points) لفك التشنجات المستعصية فورياً.',
              icon: '🎯'
            },
            {
              title: 'التأهيل الحركي المنزلي',
              desc: 'متابعة دورية عن بعد وتصميم برامج تناسب بيئة المريض الحياتية والوظيفية.',
              icon: '🏡'
            }
          ].map((serv, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-teal-500 shadow-sm space-y-2">
              <span className="text-3xl block">{serv.icon}</span>
              <h4 className="font-bold text-sm text-stone-900">{serv.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{serv.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBookingForPhysio}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xl transition-all hover:scale-102"
          >
            <Calendar className="w-4 h-4" />
            <span>حجز جلسة كشف وعلاج طبيعي مع الاستشاري</span>
          </button>
        </div>

      </div>
    </section>
  );
};
