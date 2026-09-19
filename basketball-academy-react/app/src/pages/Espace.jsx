import { useAuth } from '../context/AuthContext'

const CONTENT = {
  poussin: {
    title: 'Espace Poussin U10',
    badge: 'Initiation & Épanouissement',
    tagline: 'Découvrez le plaisir du jeu !',
    desc: "Développer l'agilité, la coordination et l'amour du ballon orange à travers des exercices ludiques et adaptés.",
    coachs: 'Med Mahdi Bouallegue & Med Malek Ghanmi',
    horaires: [
      { jour: 'Vendredi', heure: '19h – 20h' },
      { jour: 'Dimanche', heure: '13h – 14h' },
    ],
  },
  benjamin: {
    title: 'Espace Benjamin U12',
    badge: 'Fondamentaux Techniques',
    tagline: "Construire les bases d'un vrai joueur !",
    desc: 'Dribble, passe, tir : consolidation des fondamentaux techniques et introduction du jeu collectif.',
    coachs: 'Med Mahdi Bouallegue & Med Malek Ghanmi',
    horaires: [
      { jour: 'Vendredi', heure: '19h – 20h' },
      { jour: 'Dimanche', heure: '13h – 14h' },
    ],
  },
  'academie-jeunes': {
    title: 'Espace Académie Jeunes',
    badge: 'Orientation Compétition',
    tagline: 'Se préparer au haut niveau !',
    desc: 'Tactique avancée, intensité physique et préparation mentale pour la compétition régionale.',
    coachs: 'Med Mahdi Bouallegue & Med Malek Ghanmi',
    horaires: [
      { jour: 'Vendredi', heure: '19h – 20h' },
      { jour: 'Dimanche', heure: '13h – 14h' },
    ],
  },
  'academie-seniors': {
    title: 'Espace Académie Seniors',
    badge: 'Haute Performance',
    tagline: 'Performance et compétition !',
    desc: 'Perfectionnement technico-tactique et participation aux championnats régionaux.',
    coachs: 'Med Mahdi Bouallegue & Med Malek Ghanmi',
    horaires: [
      { jour: 'Vendredi', heure: '20h – 21h00' },
      { jour: 'Dimanche', heure: '14h – 15h' },
    ],
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

  return (
    <div>
      <div className="bg-court border-b-4 border-ember py-12 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-ember mb-2">{info.title}</h1>
        <span className="inline-block text-sm text-slate-300">
          🥷 Coachs: {info.coachs}
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
            <p className="text-slate-300 text-sm">{info.desc}</p>
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
              <div key={h.jour} className="rounded-xl bg-white text-court p-4 shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{h.jour}</span>
                  <span className="text-xs font-bold bg-ember text-court px-2 py-1 rounded-full">Séance</span>
                </div>
                <div className="font-bold text-lg">⏰ {h.heure}</div>
                <a href="https://maps.app.goo.gl/T6pmesV4CPice4yk8" target="_blank" rel="noreferrer" className="text-xs text-slate-500">
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
      </div>
    </div>
  )
}
