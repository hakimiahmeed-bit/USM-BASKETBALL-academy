import { useAuth } from '../context/AuthContext'

const CONTENT = {
  poussin: { title: 'Espace Poussin U10', desc: 'Programme ludique axé sur la coordination et le plaisir du jeu.' },
  benjamin: { title: 'Espace Benjamin U12', desc: 'Fondamentaux techniques : dribble, passe, tir.' },
  'academie-jeunes': { title: 'Espace Académie Jeunes', desc: 'Préparation à la compétition et tactique avancée.' },
  'academie-seniors': { title: 'Espace Académie Seniors', desc: 'Perfectionnement, compétition régionale et performance.' },
}

function statutBadge(statut) {
  if (statut === 'Approuvé') return 'bg-green-500/20 text-green-300 border-green-500/40'
  if (statut === 'Rejeté') return 'bg-red-500/20 text-red-300 border-red-500/40'
  return 'bg-ember/20 text-ember border-ember/40'
}

export default function Espace({ category }) {
  const { profile } = useAuth()
  const info = CONTENT[category]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl text-ember mb-2">{info.title}</h1>
      <p className="text-slate-400 mb-8">{info.desc}</p>

      <div className="rounded-2xl border border-line bg-courtdeep p-6 space-y-3">
        <Row label="Nom">{profile?.nom}</Row>
        <Row label="Email">{profile?.email}</Row>
        <Row label="Catégorie">{profile?.categorie}</Row>
        <Row label="Statut du compte">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statutBadge(profile?.statut)}`}>
            {profile?.statut || 'En attente'}
          </span>
        </Row>
        <Row label="Dernier paiement">{profile?.dateDernierPaiement || 'Aucun paiement enregistré'}</Row>
      </div>

      {profile?.statut === 'En attente' && (
        <p className="mt-4 text-sm text-slate-400">
          Votre inscription est en attente de validation par l'administration.
        </p>
      )}
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  )
}
