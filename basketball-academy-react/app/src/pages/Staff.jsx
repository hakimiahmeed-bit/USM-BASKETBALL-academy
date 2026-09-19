import { useState } from 'react'
import Lightbox from '../components/Lightbox'

const direction = [
  { nom: 'Hatem Zeer', role: 'Président', img: '/images/president.jpg', desc: 'Grande expérience en gestion sportive.' },
  { nom: 'Khouloud Bey', role: 'Staff administrative', img: '/images/p2.jpg', desc: 'Spécialiste en formation des jeunes et stratégie globale du jeu.' },
]

const technique = [
  { nom: 'Yassine Trabelsi', role: 'Directeur de section', img: '/images/p3.jpg', desc: 'Spécialisé dans le développement des jeunes.' },
  { nom: 'Malek Ghanmi', role: 'Entraîneur U14', img: '/images/p4.jpg', desc: 'Coach certifié pour les jeunes catégories.' },
  { nom: 'Med Salim Challakhi', role: 'Coach U12 & Mini-Basket', img: '/images/p5.jpg', desc: 'Spécialiste dans le développement fondamental et la motricité des petits.' },
]

export default function Staff() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div>
      <div className="bg-court border-b-4 border-ember py-14 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-ember mb-2">Notre Équipe Dirigeante et Technique</h1>
        <p className="text-slate-300">Des professionnels passionnés au service du développement des jeunes talents.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Synergie — Arabic RTL */}
        <div className="rounded-3xl overflow-hidden border-l-4 border-ember shadow-xl grid lg:grid-cols-12" style={{ background: 'linear-gradient(135deg,#0f0f0f 0%,#1f1f1f 100%)' }}>
          <div className="lg:col-span-7 p-8 md:p-10 text-right" dir="rtl">
            <span className="inline-block bg-ember text-court font-bold text-sm px-3 py-2 rounded-full mb-3">🌟 تناغم وتكامل الطاقم</span>
            <h2 className="text-2xl md:text-3xl font-bold text-ember mb-3">سر نجاحنا.. عائلة واحدة ورؤية احترافية!</h2>
            <p className="text-slate-200 leading-loose">
              نحن لا نعمل فقط كفريق عمل، بل كعائلة رياضية واحدة يجمعها شغف كرة السلة والالتزام الكامل تجاه كل لاعب.
              بفضل التنسيق المستمر والتناغم التام بين الإدارة والمدربين، نوفر بيئة تربوية ورياضية متكاملة تضمن
              صقل المهارات الفردية وبناء روح الفريق. نعمل يداً بيد لنجعل من كل تمرين خطوة نحو النجاح والتميز!
            </p>
          </div>
          <div className="lg:col-span-5 max-h-[350px] overflow-hidden">
            <button onClick={() => setLightbox({ src: '/images/p09.jpg', alt: 'Staff Excellence & Synergie' })} className="block w-full h-full">
              <img src="/images/p09.jpg" alt="Staff Excellence & Synergie" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </button>
          </div>
        </div>

        {/* Direction & Administration */}
        <div>
          <h2 className="text-xl font-bold border-b-[3px] border-ember pb-2 mb-6">
            <span className="text-ember">👔</span> Direction & Administration
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {direction.map((p) => (
              <StaffCard key={p.nom} {...p} onClick={() => setLightbox({ src: p.img, alt: p.nom })} />
            ))}
          </div>
        </div>

        {/* Staff Technique */}
        <div>
          <h2 className="text-xl font-bold border-b-[3px] border-ember pb-2 mb-6">
            <span className="text-ember">🏀</span> Staff Technique & Entraîneurs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {technique.map((p) => (
              <StaffCard key={p.nom} {...p} dark onClick={() => setLightbox({ src: p.img, alt: p.nom })} />
            ))}
          </div>
        </div>

        {/* Esprit d'union */}
        <div className="rounded-2xl overflow-hidden border-l-4 border-ember shadow-xl grid lg:grid-cols-2" style={{ background: 'linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%)' }}>
          <div className="p-8 md:p-10">
            <span className="inline-block bg-ember text-court font-bold text-xs uppercase px-3 py-1 rounded-full mb-2">Valeurs de l'Académie</span>
            <h2 className="text-2xl md:text-3xl font-bold text-ember mb-3">🤝 روح الاتحاد</h2>
            <p className="text-slate-200 text-lg" dir="rtl">
              إدارة متماسكة وفريق فني متفانٍ حول مشروع رياضي واحد: مرافقة شبابنا نحو التميز
            </p>
          </div>
          <button onClick={() => setLightbox({ src: '/images/p6.jpg', alt: "Esprit d'union de l'équipe" })} className="max-h-[350px] overflow-hidden">
            <img src="/images/p6.jpg" alt="Esprit d'union de l'équipe" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </button>
        </div>
      </div>

      <Lightbox src={lightbox?.src} alt={lightbox?.alt} onClose={() => setLightbox(null)} />
    </div>
  )
}

function StaffCard({ nom, role, img, desc, dark, onClick }) {
  return (
    <div className="bg-white text-court rounded-2xl shadow p-5 text-center">
      <button onClick={onClick} className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-ember mb-3 block">
        <img src={img} alt={nom} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
      </button>
      <h4 className="font-bold">{nom}</h4>
      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full my-2 ${dark ? 'bg-court text-ember border border-ember' : 'bg-ember text-court'}`}>
        {role}
      </span>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  )
}
