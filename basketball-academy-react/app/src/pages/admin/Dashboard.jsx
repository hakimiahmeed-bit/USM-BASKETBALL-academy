import { useEffect, useMemo, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

// Cotisation mensuelle par catégorie (en TND).
function getCotisation(categorie) {
  const c = (categorie || '').toLowerCase()
  if (c.includes('senior')) return 50
  return 45 // Poussin, Benjamin, Académie Jeunes
}

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

  const now = new Date()
  const paymentStats = useMemo(() => {
    const approuves = players.filter((p) => p.statut === 'Approuvé')
    const payesCeMois = approuves.filter((p) => {
      if (!p.dateDernierPaiement) return false
      const d = new Date(p.dateDernierPaiement)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    const nonPayes = approuves.filter((p) => !payesCeMois.includes(p))
    return {
      approuves,
      payes: payesCeMois,
      nonPayes,
      encaisse: payesCeMois.reduce((sum, p) => sum + getCotisation(p.categorie), 0),
      attendu: approuves.reduce((sum, p) => sum + getCotisation(p.categorie), 0),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players])

  const moisLabel = now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

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
    <div className="bg-slate-100 min-h-[80vh]">
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Inscrits" value={stats.total} />
        <StatCard label="En Attente" value={stats.enAttente} />
        <StatCard label="Approuvés" value={stats.approuves} />
      </div>

      {/* Statistiques de paiement du mois */}
      <div className="rounded-2xl bg-court text-white shadow p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <h2 className="font-display text-xl text-ember capitalize">💰 Statistiques de Paiement — {moisLabel}</h2>
          <span className="text-xs text-slate-400">Cotisation : 45 DT (Poussin, Benjamin, Académie Jeunes) · 50 DT (Académie Seniors)</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <MiniStat label="Payé ce mois" value={paymentStats.payes.length} color="text-green-400" />
          <MiniStat label="Non payé" value={paymentStats.nonPayes.length} color="text-red-400" />
          <MiniStat label="Encaissé" value={`${paymentStats.encaisse} DT`} color="text-ember" />
          <MiniStat label="Attendu (total)" value={`${paymentStats.attendu} DT`} color="text-slate-300" />
        </div>

        {/* Progress bar */}
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-ember to-yellow-300 transition-all duration-700"
            style={{ width: `${paymentStats.approuves.length ? Math.round((paymentStats.payes.length / paymentStats.approuves.length) * 100) : 0}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mb-4">
          {paymentStats.approuves.length ? Math.round((paymentStats.payes.length / paymentStats.approuves.length) * 100) : 0}% des joueurs approuvés ont payé ce mois-ci
        </p>

        {paymentStats.nonPayes.length > 0 && (
          <div>
            <div className="text-sm font-bold text-slate-300 mb-2">À relancer ({paymentStats.nonPayes.length}) :</div>
            <div className="flex flex-wrap gap-2">
              {paymentStats.nonPayes.map((p) => (
                <span key={p.id} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  {p.nom} <span className="text-ember">({getCotisation(p.categorie)} DT)</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="font-display text-2xl text-ember">Liste des Joueurs</h2>
        <input
          placeholder="Rechercher un candidat (nom ou email)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg bg-white border border-slate-300 px-3 py-2 text-sm w-72 outline-none focus:border-ember"
        />
      </div>

      <div className="rounded-2xl bg-white shadow overflow-hidden">
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
                  <tr key={p.id} className="border-t border-slate-200">
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
    </div>
  )
}

function MiniStat({ label, value, color }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 text-center">
      <div className={`font-display text-3xl ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white shadow p-5 border-l-4 border-ember hover:-translate-y-1 transition-transform">
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
