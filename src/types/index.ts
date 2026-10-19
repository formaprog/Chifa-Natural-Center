export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  englishName: string;
  category: 'digestive' | 'respiratory' | 'joints' | 'nervous' | 'immunity' | 'cardio' | 'skin';
  categoryLabel: string;
  inPropheticMedicine: boolean;
  propheticReference?: string;
  benefits: string[];
  treatedConditions: string[];
  preparationMethods: {
    type: 'مغلي' | 'منقوع' | 'زيت' | 'مسحوق' | 'كمادات' | 'استنشاق';
    instructions: string;
    dosage: string;
  }[];
  precautions: string[];
  contraindications: string[]; // موانع الاستعمال
  rating: number;
  featured?: boolean;
  flavorProfile?: string;
  imageEmoji?: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'physiotherapy' | 'quran' | 'cupping' | 'consultation';
  categoryLabel: string;
  durationMinutes: number;
  price: number;
  currency: string;
  benefits: string[];
  indications: string[]; // الحالات المستهدفة
  iconName: string;
  color: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  qualifications: string[];
  rating: number;
  reviewsCount: number;
  availableDays: string[];
  avatar: string;
}

export interface Appointment {
  id: string;
  bookingCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientGender: 'male' | 'female';
  patientAge: number;
  serviceId: string;
  serviceName: string;
  therapistId: string;
  therapistName: string;
  date: string;
  timeSlot: string;
  consultationType: 'clinic' | 'online' | 'home';
  notes: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface TreatmentInquiry {
  id: string;
  inquiryCode: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  age: number;
  gender: 'male' | 'female';
  bodyPart: string;
  symptoms: string[];
  symptomDuration: string;
  conditionDescription: string;
  preferredHealingApproach: 'all' | 'physiotherapy' | 'quran' | 'herbal';
  createdAt: string;
  status: 'answered' | 'under_review';
  autoRecommendation?: {
    quranVerses: string[];
    recommendedHerbs: string[];
    physioAdvice: string[];
    propheticMedicineTip: string;
  };
}

export interface RuqyahItem {
  id: string;
  title: string;
  surahOrSource: string;
  textArabic: string;
  repeatCount: number;
  purpose: string;
  audioUrl?: string;
  hadithVirtue?: string;
}

export interface PhysioExercise {
  id: string;
  title: string;
  targetArea: string;
  targetAreaId: 'back' | 'neck' | 'knee' | 'shoulder' | 'spine';
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  durationSeconds: number;
  repetitions: string;
  instructions: string[];
  cautions: string[];
  benefits: string;
}
