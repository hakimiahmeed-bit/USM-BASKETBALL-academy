import { useEffect, useMemo, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

function statutBadge(statut) {
  if (statut === 'Approuvé') return 'bg-green-500/20 text-green-300 border-green-500/40'
  if (statut === 'Rejeté') return 'bg-red-500/20 text-red-300 border-red-500/40'
  return 'bg-ember/20 text-ember border-ember/40'
}

function paiementInfo(dateStr) {
  if (!dateStr) return { label: 'Non Payé', cls: 'bg-red-500/20 text-red-300 border-red-500/40', sub: 'Aucun paiement' }
  const paye = new Date(dateStr)
  const today = new Date()
  const diffDays = Math.floor((today - paye) / (1000 * 60 * 60 * 24))
  if (diffDays <= 30) {
    return { label: 'Payé (Abonné)', cls: 'bg-green-500/20 text-green-300 border-green-500/40', sub: `Reste ${30 - diffDays} jour(s)` }
  }
  return { label: 'Expiré', cls: 'bg-ember/20 text-ember border-ember/40', sub: `Expiré depuis ${diffDays - 30} jrs` }
}

export default function Dashboard() {
  const [players, setPlayers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setPlayers(snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((p) => p.role !== 'admin'))
    })
    return unsub
  }, [])

  const stats = useMemo(() => ({
    total: players.length,
    enAttente: players.filter((p) => p.statut === 'En attente').length,
    approuves: players.filter((p) => p.statut === 'Approuvé').length,
  }), [players])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return players
    return players.filter((p) => p.nom?.toLowerCase().includes(s) || p.email?.toLowerCase().includes(s))
  }, [players, search])

  async function setStatut(id, statut) {
    await updateDoc(doc(db, 'users', id), { statut })
  }
  async function marquerPaye(id) {
    if (!confirm('Confirmer le paiement de ce mois pour ce joueur ?')) return
    await updateDoc(doc(db, 'users', id), { dateDernierPaiement: new Date().toISOString().slice(0, 10) })
  }
  async function supprimer(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement ce joueur ?')) return
    await deleteDoc(doc(db, 'users', id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Inscrits" value={stats.total} />
        <StatCard label="En Attente" value={stats.enAttente} />
        <StatCard label="Approuvés" value={stats.approuves} />
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="font-display text-2xl text-ember">Liste des Joueurs</h2>
        <input
          placeholder="Rechercher un candidat (nom ou email)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg bg-courtdeep border border-line px-3 py-2 text-sm w-72 outline-none focus:border-ember"
        />
      </div>

      <div className="rounded-2xl border border-line bg-courtdeep overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-court text-ember text-left">
              <tr>
                <Th>Nom & Contact</Th>
                <Th>Inscrit le</Th>
                <Th>Catégorie</Th>
                <Th>Statut</Th>
                <Th>Paiement</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-slate-500">Aucun joueur trouvé.</td></tr>
              )}
              {filtered.map((p) => {
                const pay = paiementInfo(p.dateDernierPaiement)
                return (
                  <tr key={p.id} className="border-t border-line">
                    <Td>
                      <div className="font-semibold">{p.nom}</div>
                      <div className="text-slate-400 text-xs">{p.email}</div>
                    </Td>
                    <Td>{p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString('fr-FR') : '—'}</Td>
                    <Td>{p.categorie || 'Non assigné'}</Td>
                    <Td>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold border ${statutBadge(p.statut)}`}>
                        {p.statut || 'En attente'}
                      </span>
                    </Td>
                    <Td>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold border ${pay.cls}`}>{pay.label}</span>
                      <div className="text-xs text-slate-400 mt-1">{pay.sub}</div>
                    </Td>
                    <Td>
                      <div className="flex flex-wrap gap-2">
                        {p.statut !== 'Approuvé' && (
                          <ActionBtn onClick={() => setStatut(p.id, 'Approuvé')} cls="bg-green-600">✓</ActionBtn>
                        )}
                        {p.statut !== 'Rejeté' && (
                          <ActionBtn onClick={() => setStatut(p.id, 'Rejeté')} cls="bg-ember text-court">✕</ActionBtn>
                        )}
                        <ActionBtn onClick={() => marquerPaye(p.id)} cls="bg-sky-600">$</ActionBtn>
                        <ActionBtn onClick={() => supprimer(p.id)} cls="bg-red-600">🗑</ActionBtn>
                      </div>
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-line bg-courtdeep p-5">
      <div className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{label}</div>
      <div className="font-display text-4xl mt-1">{value}</div>
    </div>
  )
}
function Th({ children }) { return <th className="px-4 py-3 font-semibold">{children}</th> }
function Td({ children }) { return <td className="px-4 py-3 align-top">{children}</td> }
function ActionBtn({ children, onClick, cls }) {
  return (
    <button onClick={onClick} className={`w-8 h-8 rounded-lg font-bold text-sm ${cls}`}>
      {children}
    </button>
  )
}
