import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Lightbox from '../components/Lightbox'

const gallery = Array.from({ length: 11 }, (_, i) => `/images/gallery${i + 1}.jpg`)

const features = [
  { icon: '🏀', title: 'Entraînement Pro', desc: "Des programmes adaptés à toutes les catégories d'âge avec un suivi personnalisé." },
  { icon: '👥', title: 'Staff Certifié', desc: 'Des entraîneurs diplômés et expérimentés dans la formation des jeunes.' },
  { icon: '🏆', title: 'Compétitions', desc: "Participation aux tournois régionaux et nationaux tout au long de l'année." },
]

const spaceFor = (cat) => {
  const c = (cat || '').toLowerCase()
  if (c.includes('poussin')) return '/espace/poussin'
  if (c.includes('benjamin')) return '/espace/benjamin'
  if (c.includes('jeunes')) return '/espace/academie-jeunes'
  if (c.includes('senior')) return '/espace/academie-seniors'
  return '/'
}

export default function Home() {
  const { user, profile, isAdmin } = useAuth()
  const [lightbox, setLightbox] = useState(null)

  const espaceLink = isAdmin ? '/admin' : user ? spaceFor(profile?.categorie) : '/connexion'

  return (
    <div>
      {/* HERO */}
      <div className="bg-court border-b-4 border-ember py-16 text-center px-4">
        <img
          src="/logoo.png"
          alt="Logo Basket Academy"
          className="w-32 h-32 md:w-36 md:h-36 object-contain mx-auto mb-6 rounded-full bg-court border-2 border-ember p-2 transition-transform duration-300 hover:scale-105 hover:rotate-2"
          style={{ filter: 'drop-shadow(0 0 15px rgba(255,193,7,0.4))' }}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-ember mb-3">Bienvenue à US Mourouj</h1>
        <p className="text-slate-300 max-w-xl mx-auto mb-8">
          Développez vos compétences et rejoignez la meilleure académie de basketball.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <Link to={espaceLink} className="px-6 py-3 rounded-full bg-ember text-court font-bold">
              🏀 Accéder à Mon Espace
            </Link>
          ) : (
            <Link to="/inscription" className="px-6 py-3 rounded-full bg-ember text-court font-bold">
              S'inscrire Maintenant
            </Link>
          )}
          <Link to="/equipe" className="px-6 py-3 rounded-full border border-slate-400 text-slate-200 font-bold">
            Découvrir le Staff
          </Link>
        </div>
      </div>

      {/* MOTIVATION — Arabic RTL card, matches original */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="rounded-3xl overflow-hidden border-l-4 border-ember shadow-xl grid lg:grid-cols-12" style={{ background: 'linear-gradient(135deg,#111 0%,#222 100%)' }}>
          <div className="lg:col-span-7 p-8 md:p-10 text-right" dir="rtl">
            <span className="inline-block bg-ember text-court font-bold text-sm px-3 py-2 rounded-full mb-3">
              🏀 شغف، انضباط، وتميز
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-ember mb-3">اصنع مستقبلك الرياضي معنا!</h2>
            <p className="text-slate-200 leading-loose mb-4">
              كرة السلة ليست مجرد لعبة تُمارس داخل الملعب، بل هي أسلوب حياة يصنع الشغف، ويبني الشخصية القوية،
              ويعلمنا كيف ننهض بعد كل تعثر. في أكاديميتنا، نفتح لك الأبواب لتكون جزءاً من مجتمع رياضي متكامل
              يجمع بين المتعة، الانضباط، وتطوير المهارات. لا تنتظر الفرصة، بل اصنعها بنفسك اليوم وانضم إلى
              عائلتنا الرياضية لنبدأ رحلة التميز معاً.
            </p>
            {!user && (
              <Link to="/inscription" className="inline-block px-5 py-2 rounded-full bg-ember text-court font-bold">
                انضم إلينا الآن ←
              </Link>
            )}
          </div>
          <div className="lg:col-span-5 max-h-[380px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop"
              alt="Basketball Passion"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <div className="grid md:grid-cols-3 gap-5 text-center">
          {features.map((f) => (
            <div key={f.title} className="bg-white text-court rounded-3xl shadow p-6">
              <div className="text-4xl text-ember mb-3">{f.icon}</div>
              <h4 className="font-bold text-lg mb-1">{f.title}</h4>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY BAND */}
      <section className="bg-courtdeep border-y-[3px] border-ember py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-ember text-court font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-full mb-2">
              📷 En Images
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">La Vie de Notre Académie</h2>
            <p className="text-slate-500 text-sm mt-1">Cliquez sur une photo pour l'agrandir</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox({ src, alt: `Basketball Photo ${i + 1}` })}
                className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,193,7,0.4)] transition-all duration-300"
              >
                <img src={src} alt={`Basketball Photo ${i + 1}`} className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300" />
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.facebook.com/people/USM-basketball/100095321656479/?sk=photos"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-2 rounded-full border border-ember text-ember font-bold"
            >
              Voir plus de photos sur Facebook
            </a>
          </div>
        </div>
      </section>

      <Lightbox src={lightbox?.src} alt={lightbox?.alt} onClose={() => setLightbox(null)} />
    </div>
  )
}
