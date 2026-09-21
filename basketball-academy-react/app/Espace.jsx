import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const CONTENT = {
  poussin: {
    emoji: '🌟',
    gradient: 'from-amber-500/20 via-court to-court',
    title: 'Espace Poussin U10',
    badge: 'Initiation & Épanouissement',
    tagline: 'Découvrez le plaisir du jeu !',
    desc: "Développer l'agilité, la coordination et l'amour du ballon orange à travers des exercices ludiques et adaptés.",
    coachs: ['Med Mahdi Bouallegue', 'Med Malek Ghanmi'],
    horaires: [
      { jour: 'Vendredi', heure: '19h – 20h' },
      { jour: 'Dimanche', heure: '13h – 14h' },
    ],
    tips: {
      title: 'عالم كرة السلة للمستكشفين الصغار (أقل من 10 سنوات)',
      intro: 'مرحلة الاكتشاف والمرح (8 - 10 سنوات): كرة السلة في هذا العمر هي رحلة ممتعة للتعلم وشغف باللعبة والتعرف على أصدقاء جدد.',
      body: 'في هذه المرحلة العمرية، نركز على جعل الطفل يحب رياضة كرة السلة من خلال ألعاب حركية ممتعة. نتعلم كيفية التحكم في الكرة (المراوغة) باليدين اليمنى واليسرى، كيفية الجري والتوقف الصحيح دون السقوط، والتصويب نحو السلة بفرح وشغف.',
      tips: [
        'الاستمتاع باللعب: العب دائماً بابتسامة واستمتع بكل تمريرة وتصويبة.',
        'احترام الأصدقاء والمدرب: ننصت للكوتش ونساعد أصدقاءنا في الفريق.',
        'الانضباط والحضور: نرتدي الزي الرياضي ونحضر في الوقت المحدد للحفاظ على الحماس.',
      ],
      quote: 'كل بطل كبير في كرة السلة بدأ خطوته الأولى برغبة بسيطة في اللعب والمرح!',
    },
  },
  benjamin: {
    emoji: '🏀',
    gradient: 'from-orange-500/20 via-court to-court',
    title: 'Espace Benjamin U12',
    badge: 'Formation & Progression',
    tagline: 'Développez vos fondamentaux !',
    desc: "Chaque séance est une opportunité d'améliorer votre dribble, votre tir et votre esprit d'équipe, sous la direction de nos coachs certifiés.",
    coachs: ['Med Mahdi Bouallegue', 'Med Malek Ghanmi'],
    horaires: [
      { jour: 'Vendredi', heure: '19h – 20h' },
      { jour: 'Dimanche', heure: '13h – 14h' },
    ],
    tips: {
      title: 'نصائح وإرشادات U12',
      intro: 'مرحلة بناء الأساسيات (10 - 13 سنة): الوقت المثالي لترسيخ الحركات الصحيحة والانضباط الرياضي.',
      body: 'في هذه المرحلة، نعمل على تطوير المهارات الفردية (المراوغة، التمرير، التصويب) مع إدخال مبادئ اللعب الجماعي والتكتيك البسيط، لتحضير اللاعب للمراحل القادمة.',
      tips: [
        'الانضباط في التمارين: تكرار الحركة الصحيحة هو سر التقدم.',
        'روح الفريق: التمرير للزميل لا يقل أهمية عن التسجيل.',
        'الجدية والالتزام: الحضور المنتظم يصنع الفارق.',
      ],
      quote: 'التفاصيل الصغيرة اليوم تصنع اللاعب الكبير غداً!',
    },
  },
  'academie-jeunes': {
    emoji: '🔥',
    gradient: 'from-red-500/20 via-court to-court',
    title: 'Espace Académie Jeunes',
    badge: 'Orientation Compétition',
    tagline: 'Se préparer au haut niveau !',
    desc: 'Tactique avancée, intensité physique et préparation mentale pour la compétition régionale.',
    coachs: ['Med Mahdi Bouallegue', 'Med Malek Ghanmi'],
    horaires: [
      { jour: 'Vendredi', heure: '19h – 20h' },
      { jour: 'Dimanche', heure: '13h – 14h' },
    ],
    tips: {
      title: 'نصائح وإرشادات فئة الشباب',
      intro: 'مرحلة الانتقال نحو المنافسة (14 - 18 سنة): بناء اللاعب الرياضي والتكتيكي المتكامل.',
      body: 'التركيز هنا على الجاهزية البدنية، فهم التكتيكات الجماعية، واتخاذ القرار السريع داخل الملعب، إلى جانب الإعداد الذهني لمواجهة الضغط في المباريات.',
      tips: [
        'الانضباط التكتيكي: فهم دورك داخل الفريق في كل لحظة.',
        'التحضير البدني: النوم الجيد والتغذية السليمة جزء من التدريب.',
        'العقلية القوية: التعلم من الأخطاء دون فقدان الثقة.',
      ],
      quote: 'الأبطال يُصنعون في التمارين، ويُتوَّجون في المباريات!',
    },
  },
  'academie-seniors': {
    emoji: '🏆',
    gradient: 'from-yellow-500/20 via-court to-court',
    title: 'Espace Académie Seniors',
    badge: 'Haute Performance',
    tagline: 'Performance et compétition !',
    desc: 'Perfectionnement technico-tactique et participation aux championnats régionaux.',
    coachs: ['Med Mahdi Bouallegue', 'Med Malek Ghanmi'],
    horaires: [
      { jour: 'Vendredi', heure: '20h – 21h00' },
      { jour: 'Dimanche', heure: '14h – 15h' },
    ],
    tips: {
      title: 'نصائح وإرشادات فئة الأكابر',
      intro: 'مرحلة الأداء العالي (18 سنة فما فوق): الانضباط الاحترافي والالتزام التام بالمشروع الرياضي.',
      body: 'في هذه المرحلة، الأداء الفردي والجماعي يخدم هدفاً واحداً: التتويج في البطولات الجهوية. الجدية في التحضير والانسجام مع خطة المدرب أساس النجاح.',
      tips: [
        'الالتزام الكامل: الحضور والانضباط شرط أساسي للمنافسة.',
        'الانسجام الجماعي: اللعب من أجل الفريق قبل الفرد.',
        'الاحترافية: التعامل مع كل مباراة وتمرين بجدية تامة.',
      ],
      quote: 'الفوز يبدأ بالعقلية قبل أن يبدأ في الملعب!',
    },
  },
}

function initials(nom) {
  if (!nom) return '?'
  return nom
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function paymentProgress(dateStr) {
  if (!dateStr) return null
  const paye = new Date(dateStr)
  const today = new Date()
  const diffDays = Math.floor((today - paye) / (1000 * 60 * 60 * 24))
  const pct = Math.max(0, Math.min(100, Math.round((diffDays / 30) * 100)))
  const restant = 30 - diffDays
  return { pct, restant, expired: diffDays > 30 }
}

function statutMeta(statut) {
  if (statut === 'Approuvé') return { dot: 'bg-emerald-400', label: 'Approuvé', ring: 'ring-emerald-400/40' }
  if (statut === 'Rejeté') return { dot: 'bg-red-500', label: 'Rejeté', ring: 'ring-red-500/40' }
  return { dot: 'bg-ember', label: 'En attente', ring: 'ring-ember/40' }
}

export default function Espace({ category }) {
  const { profile } = useAuth()
  const info = CONTENT[category]
  const [showTips, setShowTips] = useState(false)
  const meta = statutMeta(profile?.statut)
  const payment = paymentProgress(profile?.dateDernierPaiement)

  return (
    <div className="bg-court min-h-screen">
      {/* HERO */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${info.gradient} border-b border-ember/30`}>
        <div className="absolute -right-10 -top-10 text-[220px] opacity-10 select-none pointer-events-none animate-float">
          {info.emoji}
        </div>
        <div className="max-w-4xl mx-auto px-4 py-16 relative">
          <span className="inline-block text-4xl mb-3 animate-float">{info.emoji}</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {info.title}
          </h1>
          <p className="text-ember font-semibold">
            👋 Bon retour, {profile?.nom?.split(' ')[0] || 'champion'} !
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <span>🥷</span>
            <span>Coachs&nbsp;: {info.coachs.join(' & ')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative pb-16 space-y-6">

        {/* PLAYER CARD */}
        <div className="animate-fade-up rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-court border border-ember/20 shadow-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-ember text-court font-bold text-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,193,7,0.4)]">
              {initials(profile?.nom)}
            </div>
            <div className="flex-1 min-w-[180px]">
              <div className="text-white font-bold text-lg">{profile?.nom}</div>
              <div className="text-slate-400 text-sm">{profile?.email}</div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 ring-2 ${meta.ring}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${meta.dot} animate-pulse-dot`} />
              <span className="text-white text-sm font-bold">{meta.label}</span>
            </div>
          </div>

          {profile?.statut === 'En attente' && (
            <p className="mt-4 text-sm text-ember/90 bg-ember/10 border border-ember/30 rounded-xl px-4 py-3">
              ⏳ Votre inscription est en attente de validation par l'administration.
            </p>
          )}

          {/* Payment status */}
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-300 font-semibold">💳 Cotisation mensuelle</span>
              <span className="text-slate-400">
                {profile?.dateDernierPaiement || 'Aucun paiement enregistré'}
              </span>
            </div>
            {payment ? (
              <>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${payment.expired ? 'bg-red-500' : 'bg-gradient-to-r from-ember to-yellow-300'}`}
                    style={{ width: `${payment.pct}%` }}
                  />
                </div>
                <p className={`text-xs mt-2 font-semibold ${payment.expired ? 'text-red-400' : 'text-ember'}`}>
                  {payment.expired ? `⚠️ Expiré depuis ${Math.abs(payment.restant)} jour(s)` : `✅ ${payment.restant} jour(s) restant(s) sur le cycle`}
                </p>
              </>
            ) : (
              <p className="text-xs text-slate-500">Aucun cycle de paiement actif pour le moment.</p>
            )}
          </div>
        </div>

        {/* TAGLINE BANNER */}
        <div
          className="animate-fade-up rounded-3xl overflow-hidden relative bg-court border border-line"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-7 p-6 md:p-8">
              <span className="inline-block bg-ember text-court font-bold text-xs px-3 py-1 rounded-full mb-3">
                {info.badge}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{info.tagline}</h3>
              <p className="text-slate-400 text-sm mb-5">{info.desc}</p>
              <button
                onClick={() => setShowTips(true)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ember text-court text-sm font-bold hover:shadow-[0_0_20px_rgba(255,193,7,0.55)] transition-all"
              >
                نصائح وإرشادات
                <span className="transition-transform group-hover:translate-x-1">←</span>
              </button>
            </div>
            <div className="md:col-span-5 min-h-[180px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop"
                alt="Training"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* WEEKLY SCHEDULE */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h4 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
            📅 Emploi du Temps Hebdomadaire
          </h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {info.horaires.map((h, i) => (
              <div
                key={h.jour}
                className="group relative rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-court border border-line p-5 hover:border-ember/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,193,7,0.15)] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white">{h.jour}</span>
                  <span className="text-[10px] font-bold bg-ember text-court px-2 py-1 rounded-full">Séance {i + 1}</span>
                </div>
                <div className="text-2xl font-bold text-ember mb-1">⏰ {h.heure}</div>
                <a
                  href="https://maps.app.goo.gl/T6pmesV4CPice4yk8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-ember transition-colors inline-flex items-center gap-1"
                >
                  📍 Terrain Fit Factory
                </a>
              </div>
            ))}
            <div className="rounded-2xl bg-white/5 border border-dashed border-slate-600 p-5 flex flex-col justify-center text-center">
              <span className="text-2xl mb-1">🛌</span>
              <span className="text-slate-400 text-sm font-semibold">Repos & Récupération</span>
              <span className="text-slate-600 text-xs mt-1">Les autres jours</span>
            </div>
          </div>
        </div>

        {/* COACHES */}
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h4 className="font-bold text-lg text-white mb-3">🧑‍🏫 Encadrement Technique</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {info.coachs.map((nom) => (
              <div
                key={nom}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-court border border-line hover:border-ember/50 transition-colors"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-ember text-court flex items-center justify-center text-lg font-bold shadow-[0_0_14px_rgba(255,193,7,0.5)]">
                  {initials(nom)}
                </div>
                <div>
                  <div className="font-bold text-white">{nom}</div>
                  <div className="text-ember text-xs font-semibold">Coach certifié</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOTIVATION STRIP */}
        <div
          className="animate-fade-up rounded-2xl bg-gradient-to-r from-ember/10 via-ember/5 to-transparent border border-ember/20 p-6 text-center"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-ember font-semibold italic" dir="rtl">
            {info.tips.quote}
          </p>
        </div>
      </div>

      {showTips && <TipsModal info={info} onClose={() => setShowTips(false)} />}
    </div>
  )
}

function TipsModal({ info, onClose }) {
  const t = info.tips
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white text-court rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border-2 border-ember animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-court text-ember p-5 border-b-[3px] border-ember flex items-start justify-between" dir="rtl">
          <h3 className="font-bold text-lg pr-2">💛 {t.title}</h3>
          <button onClick={onClose} className="text-white/70 hover:text-ember text-xl leading-none">✕</button>
        </div>
        <div className="p-5" dir="rtl">
          <div className="bg-amber-50 border border-ember/40 rounded-xl p-4 mb-4 text-sm">
            <strong>{t.intro}</strong>
          </div>
          <p className="text-slate-600 text-sm leading-loose mb-4">{t.body}</p>
          <ul className="space-y-2 mb-4">
            {t.tips.map((tip) => (
              <li key={tip} className="text-sm text-slate-700">⭐ {tip}</li>
            ))}
          </ul>
          <div className="bg-slate-100 rounded-xl p-4 text-center italic text-sm font-semibold">
            {t.quote}
          </div>
        </div>
        <div className="p-4 bg-slate-50 flex justify-center">
          <button onClick={onClose} className="px-6 py-2 rounded-full bg-ember text-court font-bold hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-shadow">
            فهمت، شكراً !
          </button>
        </div>
      </div>
    </div>
  )
}
