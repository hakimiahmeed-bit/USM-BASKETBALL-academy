import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const CONTENT = {
  poussin: {
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

function statutBadge(statut) {
  if (statut === 'Approuvé') return 'bg-ember text-court'
  if (statut === 'Rejeté') return 'bg-red-600 text-white'
  return 'bg-slate-600 text-white'
}

export default function Espace({ category }) {
  const { profile } = useAuth()
  const info = CONTENT[category]
  const [showTips, setShowTips] = useState(false)

  return (
    <div>
      <div className="bg-court border-b-4 border-ember py-12 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-ember mb-2">{info.title}</h1>
        <span className="inline-block text-sm text-slate-300">
          🥷 Coachs: {info.coachs.join(' & ')}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Profile card */}
        <div className="rounded-2xl border border-line bg-white text-court p-6 shadow">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div className="font-bold text-lg">{profile?.nom}</div>
              <div className="text-slate-500 text-sm">{profile?.email}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statutBadge(profile?.statut)}`}>
              {profile?.statut || 'En attente'}
            </span>
          </div>
          <div className="text-sm text-slate-500">
            Dernier paiement : <span className="font-semibold text-court">{profile?.dateDernierPaiement || 'Aucun paiement enregistré'}</span>
          </div>
          {profile?.statut === 'En attente' && (
            <p className="mt-3 text-sm text-amber-600">
              Votre inscription est en attente de validation par l'administration.
            </p>
          )}
        </div>

        {/* Banner */}
        <div className="rounded-2xl overflow-hidden bg-court text-white grid md:grid-cols-12">
          <div className="md:col-span-7 p-6 md:p-8">
            <span className="inline-block bg-ember text-court font-bold text-xs px-3 py-1 rounded-full mb-2">{info.badge}</span>
            <h3 className="text-xl font-bold text-ember mb-2">{info.tagline}</h3>
            <p className="text-slate-300 text-sm mb-4">{info.desc}</p>
            <button
              onClick={() => setShowTips(true)}
              className="px-4 py-2 rounded-full border border-ember text-ember text-sm font-bold hover:bg-ember hover:text-court hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
            >
              ℹ️ Voir plus : نصائح وإرشادات
            </button>
          </div>
          <div className="md:col-span-5 max-h-[220px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop"
              alt="Training"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Weekly schedule */}
        <div>
          <h4 className="font-bold text-lg mb-3">📅 Emploi du Temps Hebdomadaire</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {info.horaires.map((h) => (
              <div key={h.jour} className="rounded-xl bg-white text-court p-4 shadow hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{h.jour}</span>
                  <span className="text-xs font-bold bg-ember text-court px-2 py-1 rounded-full">Séance</span>
                </div>
                <div className="font-bold text-lg">⏰ {h.heure}</div>
                <a href="https://maps.app.goo.gl/T6pmesV4CPice4yk8" target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-ember transition-colors">
                  📍 Terrain Fit Factory
                </a>
              </div>
            ))}
            <div className="rounded-xl bg-slate-100 text-slate-500 p-4 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Autres jours</span>
                <span className="text-xs font-bold bg-slate-400 text-white px-2 py-1 rounded-full">Repos</span>
              </div>
              <p className="text-xs mt-2">🛌 Repos & Récupération</p>
            </div>
          </div>
        </div>

        {/* Encadrement Technique */}
        <div className="rounded-2xl bg-white text-court p-6 shadow">
          <h4 className="font-bold text-lg mb-4">🧑‍🏫 Encadrement Technique</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {info.coachs.map((nom) => (
              <div key={nom} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-11 h-11 shrink-0 rounded-full bg-ember text-court flex items-center justify-center text-lg shadow-[0_0_10px_rgba(255,193,7,0.5)]">
                  ✅
                </div>
                <div>
                  <div className="font-bold">{nom}</div>
                  <div className="text-slate-500 text-xs">Coach</div>
                </div>
              </div>
            ))}
          </div>
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
        className="bg-white text-court rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border-2 border-ember"
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
