import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Leaf, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  Check, 
  Bookmark, 
  X, 
  Filter, 
  ChevronRight,
  Flame,
  Activity,
  Heart,
  Moon,
  Wind,
  Shield,
  Layers,
  Printer,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Herb } from '../types';
import { HERBS_DATABASE, HERBS_CATEGORIES } from '../data/herbsData';
import herbalAIIcon from '../assets/images/herbal_ai_icon_1792368829684.jpg';

interface HerbalSearchEngineProps {
  initialSearchQuery?: string;
  favoriteHerbs: string[];
  onToggleFavorite: (id: string) => void;
  onOpenConsultationForHerb: (herbName: string) => void;
}

export const HerbalSearchEngine: React.FC<HerbalSearchEngineProps> = ({
  initialSearchQuery = '',
  favoriteHerbs,
  onToggleFavorite,
  onOpenConsultationForHerb,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [propheticOnly, setPropheticOnly] = useState<boolean>(false);
  const [selectedPrepMethod, setSelectedPrepMethod] = useState<string>('all');
  const [activeHerbModal, setActiveHerbModal] = useState<Herb | null>(null);
  const [showBlendGenerator, setShowBlendGenerator] = useState<boolean>(false);
  const [blendTarget, setBlendTarget] = useState<string>('joints');
  const [copiedHerbId, setCopiedHerbId] = useState<string | null>(null);

  // Sync prop changes
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filtered herbs logic
  const filteredHerbs = useMemo(() => {
    return HERBS_DATABASE.filter((herb) => {
      // Prophetic filter
      if (propheticOnly && !herb.inPropheticMedicine) return false;

      // Category filter
      if (selectedCategory === 'prophetic') {
        if (!herb.inPropheticMedicine) return false;
      } else if (selectedCategory !== 'all') {
        if (herb.category !== selectedCategory) return false;
      }

      // Preparation method filter
      if (selectedPrepMethod !== 'all') {
        const hasPrep = herb.preparationMethods.some((m) => m.type === selectedPrepMethod);
        if (!hasPrep) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = herb.name.toLowerCase().includes(q);
        const matchesEnglish = herb.englishName.toLowerCase().includes(q);
        const matchesScientific = herb.scientificName.toLowerCase().includes(q);
        const matchesCategory = herb.categoryLabel.toLowerCase().includes(q);
        const matchesBenefits = herb.benefits.some((b) => b.toLowerCase().includes(q));
        const matchesConditions = herb.treatedConditions.some((c) => c.toLowerCase().includes(q));
        const matchesHadith = herb.propheticReference ? herb.propheticReference.toLowerCase().includes(q) : false;

        return (
          matchesName ||
          matchesEnglish ||
          matchesScientific ||
          matchesCategory ||
          matchesBenefits ||
          matchesConditions ||
          matchesHadith
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, propheticOnly, selectedPrepMethod]);

  const handleCopyRecipe = (herb: Herb) => {
    const text = `العشبة: ${herb.name} (${herb.englishName})\nأهم الفوائد: ${herb.benefits.join('، ')}\nطريقة التحضير:\n${herb.preparationMethods.map(m => `- ${m.type}: ${m.instructions} (الجرعة: ${m.dosage})`).join('\n')}\nالتحذيرات: ${herb.precautions.join('، ')}`;
    navigator.clipboard.writeText(text);
    setCopiedHerbId(herb.id);
    setTimeout(() => setCopiedHerbId(null), 2500);
  };

  // Preset Blends Generator
  const BLEND_PRESETS: Record<string, { title: string; herbs: string[]; desc: string; method: string; cautions: string }> = {
    joints: {
      title: 'خلطة التسكين الذهبي للمفاصل والغضاريف',
      herbs: ['الكركم العلاجي', 'الزنجبيل البري', 'زيت الزيتون'],
      desc: 'تآزر ثلاثي قوي يجمع بين مادة الكركمين والجينجيرول ومضادات الأكسدة لمكافحة خشونة الركبة والتهاب المفاصل وفقرات الظهر.',
      method: 'يغلى نصف ملعقة صغيرة من الكركم مع ربع ملعقة زنجبيل طازج في كوب ماء، مع إضافة رشة فلفل أسود وملعقة زيت زيتون أو عسل. تؤخذ دافئة مساءً.',
      cautions: 'تجنبها قبل العمليات الجراحية أو لمرضى حصوات المرارة الحادة.'
    },
    colon: {
      title: 'خلطة تهدئة القولون العصبي وطرد الغازات',
      herbs: ['البابونج', 'اليانسون', 'النعناع البلدي'],
      desc: 'توليفة مهدئة لإرخاء تشنجات الأمعاء وطرد الغازات وتخفيف المغص والانتفاخ المصاحب للتوتر والضغوط النفسية.',
      method: 'تخلط مقادير متساوية (نصف ملعقة صغيرة من كل عشبة) وتنقع في كوب ماء مغلي لمدة 10 دقائق مع تغطية الكوب، وتشرب بعد الأكل أو قبل النوم.',
      cautions: 'آمنة تماماً لمعظم الحالات.'
    },
    sleep: {
      title: 'إكسير السكينة العميقة ومحاربة الأرق',
      herbs: ['الخزامى (اللافندر)', 'البابونج', 'البردقوش'],
      desc: 'توليفة عطرية تساعد على خفض مستويات الكورتيزول وإرخاء عضلات الرقبة والكتفين وتهيئة الدماغ لنوم هانئ عميق.',
      method: 'تنقع ملعقة صغيرة من الخليط في كوب ماء ساخن لمدة 10 دقائق وتصفى وتحلى بالعسل الطبيعي وتشرب قبل النوم بساعة.',
      cautions: 'تجنب قيادة السيارة فور تناولها لتأثيرها المهدئ والمنوم.'
    },
    immunity: {
      title: 'إكسير المناعة والطب النبوي للصدر',
      herbs: ['الحبة السوداء', 'القسط الهندي', 'عسل النحل الطبيعي'],
      desc: 'الجمع النبوي المأثور لتقوية المناعة ومقاومة نزلات البرد وتطهير الحلق والجيوب الأنفية والقصبات الهوائية.',
      method: 'يطحن ربع ملعقة من الحبة السوداء وربع ملعقة قسط هندي ويمزجان مع ملعقة عسل سدر أو شوكة، ويؤخذ على الريق مع رشفات ماء دافئ.',
      cautions: 'لا تناسب الحوامل (بسبب القسط الهندي).'
    }
  };

  return (
    <section id="herbs" className="py-20 bg-stone-100 text-stone-800 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold mb-4 border border-emerald-300">
            <Leaf className="w-4 h-4 text-emerald-700" />
            <span>محرك البحث في صيدلية الأعشاب ومنافعها</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-tajawal mb-4">
            الموسوعة الشاملة للأعشاب الطبية والطب البديل
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-tajawal">
            ابحث بالاسم، أو العرض المرضي، أو العضو المستهدف، واكتشف الطرق الصحيحة للتحضير، الجرعات الموصى بها، والتحذيرات الطبية المعتمدة.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 mb-10">
          
          {/* Main Search Input & AI GPT Assistant Link */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم العشبة (الزنجبيل، الحبة السوداء...) أو الحالة (المفاصل، القولون، الأرق، الضغط، الربو...)"
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-stone-900 placeholder-stone-400 text-base shadow-inner transition-all"
              />
              <Search className="w-6 h-6 text-emerald-600 absolute right-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* AI Assistant Link Card with Image Icon */}
            <a
              href="https://chatgpt.com/g/g-69e1794177d08191a8c200d70d54fc93-chifa-natural-center-mrkz-lshf-ltby-y"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-xl transition-all group shrink-0 border border-emerald-600/40 hover:scale-101"
              title="مساعد الشفاء الذكي للأعشاب على ChatGPT"
            >
              <img
                src={herbalAIIcon}
                alt="Chifa Natural Center"
                className="w-11 h-11 rounded-xl object-cover border border-emerald-400/50 shadow-sm group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-white font-tajawal">
                    مستشار الأعشاب الذكي
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-300 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[11px] text-emerald-200 block font-light">
                  Chifa Natural Center (GPT) ↗
                </span>
              </div>
            </a>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none text-xs sm:text-sm font-medium">
            {HERBS_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  {cat.id === 'prophetic' && <BookOpen className="w-3.5 h-3.5 text-amber-300" />}
                  {cat.id === 'joints' && <Activity className="w-3.5 h-3.5" />}
                  {cat.id === 'nervous' && <Moon className="w-3.5 h-3.5" />}
                  {cat.id === 'digestive' && <Flame className="w-3.5 h-3.5" />}
                  {cat.id === 'respiratory' && <Wind className="w-3.5 h-3.5" />}
                  {cat.id === 'immunity' && <Shield className="w-3.5 h-3.5" />}
                  {cat.id === 'cardio' && <Heart className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 text-xs sm:text-sm">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Prophetic Only Toggle */}
              <button
                type="button"
                onClick={() => setPropheticOnly(!propheticOnly)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-colors ${
                  propheticOnly
                    ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                    : 'bg-stone-50 text-stone-600 border-stone-300 hover:bg-stone-100'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>أعشاب الطب النبوي الشريف فقط</span>
                {propheticOnly && <Check className="w-3.5 h-3.5 text-amber-700" />}
              </button>

              {/* Prep Method Filter */}
              <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5">
                <Filter className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-stone-500 text-xs">طريقة التحضير:</span>
                <select
                  value={selectedPrepMethod}
                  onChange={(e) => setSelectedPrepMethod(e.target.value)}
                  className="bg-transparent text-stone-800 font-medium text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">الكل</option>
                  <option value="مغلي">مغلي (شاي دافئ)</option>
                  <option value="منقوع">منقوع في ماء</option>
                  <option value="مسحوق">مسحوق مع العسل</option>
                  <option value="زيت">دهان موضعي بزيت</option>
                  <option value="كمادات">كمادات دافئة</option>
                  <option value="استنشاق">استنشاق بخار</option>
                </select>
              </div>
            </div>

            {/* Blend Generator Toggle */}
            <button
              onClick={() => setShowBlendGenerator(!showBlendGenerator)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{showBlendGenerator ? 'إخفاء مولد الخلطات' : 'مولد الخلطات العشبية التوليفية'}</span>
            </button>

          </div>

          {/* Interactive Blend Generator Section */}
          {showBlendGenerator && (
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-stone-100 border-2 border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-base sm:text-lg font-bold text-emerald-950 font-tajawal">
                    مولد الخلطات العشبية التوليفية (Synergistic Herbal Blends)
                  </h3>
                </div>
                <span className="text-xs bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-full font-bold">
                  توليفات آمنة ومدروسة
                </span>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm mb-4">
                اختر الحالة الصحية التي تعاني منها، وسيقوم النظام بتركيب خلطة عشبية متجانسة كيميائياً وطبياً:
              </p>

              {/* Blend tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { key: 'joints', label: 'المفاصل والعمود الفقري' },
                  { key: 'colon', label: 'القولون والمغص والانتفاخ' },
                  { key: 'sleep', label: 'الأرق والتوتر والنوم' },
                  { key: 'immunity', label: 'المناعة والصدر والطب النبوي' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setBlendTarget(item.key)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      blendTarget === item.key
                        ? 'bg-emerald-800 text-white shadow-md'
                        : 'bg-white text-stone-700 hover:bg-emerald-100 border border-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Current blend details */}
              {BLEND_PRESETS[blendTarget] && (
                <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-black text-stone-900">
                      {BLEND_PRESETS[blendTarget].title}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {BLEND_PRESETS[blendTarget].herbs.map((h, i) => (
                        <span key={i} className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-lg font-bold">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {BLEND_PRESETS[blendTarget].desc}
                  </p>
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-700">
                    <strong className="text-emerald-800 block mb-1">طريقة الإعداد والمقادير:</strong>
                    {BLEND_PRESETS[blendTarget].method}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>تنبيه طبي:</strong> {BLEND_PRESETS[blendTarget].cautions}</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Results Counter and Filter Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-stone-600 px-2">
          <span>
            تم العثور على <strong>{filteredHerbs.length}</strong> عشبة طبية مطابقة لمعايير البحث
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPropheticOnly(false);
                setSelectedPrepMethod('all');
              }}
              className="text-xs text-emerald-700 hover:underline font-bold"
            >
              إعادة تعيين الفلاتر
            </button>
          )}
        </div>

        {/* Herbs Grid */}
        {filteredHerbs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHerbs.map((herb) => {
              const isFav = favoriteHerbs.includes(herb.id);
              return (
                <div
                  key={herb.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Bar with Badges and Favorite */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {herb.imageEmoji || '🌿'}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-800 transition-colors font-tajawal">
                            {herb.name}
                          </h3>
                          <p className="text-xs text-stone-400 italic">
                            {herb.scientificName} • {herb.englishName}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleFavorite(herb.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isFav
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-stone-100 text-stone-400 hover:text-stone-700'
                        }`}
                        title={isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Prophetic Medicine Badge */}
                    {herb.inPropheticMedicine && (
                      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-bold">
                        <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                        <span>من هدي الطب النبوي الشريف</span>
                      </div>
                    )}

                    {/* Category Label */}
                    <div className="mb-3">
                      <span className="text-[11px] font-semibold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md">
                        {herb.categoryLabel}
                      </span>
                    </div>

                    {/* Top Benefits (first 3) */}
                    <div className="space-y-1.5 mb-4">
                      <strong className="text-xs text-stone-700 font-bold block mb-1">
                        أبرز المنافع العلاجية:
                      </strong>
                      {herb.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-600 leading-snug">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Treated Conditions Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {herb.treatedConditions.slice(0, 4).map((cond, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-100"
                        >
                          {cond}
                        </span>
                      ))}
                      {herb.treatedConditions.length > 4 && (
                        <span className="text-[11px] text-stone-400 self-center">
                          +{herb.treatedConditions.length - 4} أخرى
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveHerbModal(herb)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>الملف الطبي والتحضير</span>
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>

                    <button
                      onClick={() => onOpenConsultationForHerb(herb.name)}
                      className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-emerald-100 text-stone-800 hover:text-emerald-900 text-xs font-bold transition-colors"
                      title="استشر الطبيب حول هذه العشبة"
                    >
                      استشارة
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-stone-800 font-tajawal">
              لم نعثر على نتائج مطابقة لبحثك
            </h3>
            <p className="text-stone-500 text-sm">
              جرب البحث بكلمات أخرى مثل "مفاصل"، "ظهر"، "قولون"، "أرق"، أو تصفح الأقسام الشائعة.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPropheticOnly(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              عرض كافة الأعشاب
            </button>
          </div>
        )}

      </div>

      {/* Deep Detailed Herb Modal */}
      {activeHerbModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-stone-900 text-white p-6 rounded-t-3xl flex items-center justify-between border-b border-stone-800 z-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeHerbModal.imageEmoji || '🌿'}</span>
                <div>
                  <h3 className="text-xl font-black font-tajawal text-white">
                    {activeHerbModal.name}
                  </h3>
                  <p className="text-xs text-stone-400 italic">
                    {activeHerbModal.scientificName} • {activeHerbModal.englishName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveHerbModal(null)}
                className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-stone-800">
              
              {/* Prophetic Hadith Quote */}
              {activeHerbModal.propheticReference && (
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>الورود في هدي السنة النبوية الشريفة:</span>
                  </div>
                  <p className="text-sm font-amiri font-bold leading-relaxed text-amber-900 pr-2 border-r-2 border-amber-400">
                    {activeHerbModal.propheticReference}
                  </p>
                </div>
              )}

              {/* Benefits list */}
              <div>
                <h4 className="text-base font-black text-stone-900 font-tajawal mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>المنافع والخصائص العلاجية المثبتة</span>
                </h4>
                <div className="space-y-2">
                  {activeHerbModal.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Methods & Dosages */}
              <div>
                <h4 className="text-base font-black text-stone-900 font-tajawal mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <span>طرق التحضير والاستخدام والجرعات الآمنة</span>
                </h4>
                <div className="space-y-3">
                  {activeHerbModal.preparationMethods.map((prep, i) => (
                    <div key={i} className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold bg-emerald-700 text-white px-2.5 py-0.5 rounded-lg">
                          طريقة: {prep.type}
                        </span>
                        <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                          الجرعة: {prep.dosage}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {prep.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Warnings & Contraindications */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>موانع الاستعمال والتحذيرات الطبية (السلامة الدوائية):</span>
                </div>
                
                {activeHerbModal.contraindications.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-rose-800 block mb-1">يمنع منعاً باتاً لـ:</span>
                    <ul className="list-disc list-inside text-xs text-rose-700 space-y-1">
                      {activeHerbModal.contraindications.map((contra, i) => (
                        <li key={i}>{contra}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeHerbModal.precautions.length > 0 && (
                  <div className="pt-2 border-t border-rose-200/60">
                    <span className="text-xs font-bold text-stone-800 block mb-1">إرشادات احترازية:</span>
                    <ul className="list-disc list-inside text-xs text-stone-700 space-y-1">
                      {activeHerbModal.precautions.map((pre, i) => (
                        <li key={i}>{pre}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-stone-100 p-4 rounded-b-3xl border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleCopyRecipe(activeHerbModal)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-300 transition-colors"
              >
                {copiedHerbId === activeHerbModal.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>تم نسخ الوصفة!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ الوصفة الطبية</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onOpenConsultationForHerb(activeHerbModal.name);
                    setActiveHerbModal(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-md"
                >
                  استشر الأخصائي حول هذه العشبة
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
