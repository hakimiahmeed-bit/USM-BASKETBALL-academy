import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, profile } = useAuth()
  const [nom, setNom] = useState(profile?.nom || '')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await updateDoc(doc(db, 'users', user.uid), { nom })
      setSaved(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display text-3xl text-ember mb-6">Mon Profil</h1>
      <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-line bg-courtdeep p-8">
        {saved && <div className="rounded-lg bg-green-500/10 border border-green-500/40 text-green-300 text-sm p-3">Profil mis à jour.</div>}
        <div>
          <label className="block text-sm font-semibold mb-1">Nom</label>
          <input value={nom} onChange={(e) => setNom(e.target.value)}
            className="w-full rounded-lg bg-court border border-line px-3 py-2 outline-none focus:border-ember" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input disabled value={profile?.email || ''}
            className="w-full rounded-lg bg-court border border-line px-3 py-2 opacity-60" />
        </div>
        <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold disabled:opacity-50">
          {busy ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  )
}
