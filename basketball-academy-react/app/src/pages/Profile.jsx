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
    <div>
      <div className="bg-court border-b-4 border-ember py-12 text-center px-4">
        <h1 className="text-3xl font-bold text-ember">Mon Profil</h1>
      </div>
      <div className="max-w-md mx-auto px-4 py-12">
        <form onSubmit={handleSave} className="space-y-4 rounded-2xl bg-white shadow p-8">
          {saved && <div className="rounded-lg bg-green-100 border border-green-400 text-green-800 text-sm p-3">Profil mis à jour.</div>}
          <div>
            <label className="block text-sm font-semibold mb-1">Nom</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-ember" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input disabled value={profile?.email || ''}
              className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 opacity-70" />
          </div>
          <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold hover:shadow-[0_0_18px_rgba(255,193,7,0.5)] transition-shadow disabled:opacity-50">
            {busy ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  )
}
