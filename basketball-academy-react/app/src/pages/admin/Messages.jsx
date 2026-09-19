import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
    return unsub
  }, [])

  async function supprimer(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return
    await deleteDoc(doc(db, 'messages', id))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-ember">Messages Reçus</h1>
        <span className="px-3 py-1 rounded-full bg-ember text-court text-xs font-bold">{messages.length} message(s)</span>
      </div>

      <div className="space-y-3">
        {messages.length === 0 && <p className="text-slate-500">Aucun message reçu pour le moment.</p>}
        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl border border-line bg-courtdeep p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">{m.nom}</span>{' '}
                <a href={`mailto:${m.email}`} className="text-ember text-sm">{m.email}</a>
              </div>
              <button onClick={() => supprimer(m.id)} className="text-red-400 text-sm font-bold">Supprimer</button>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {m.sujet} · {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleString('fr-FR') : ''}
            </div>
            <p className="mt-3 text-sm text-slate-300 whitespace-pre-line">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
