import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [status, setStatus] = useState(null) // 'ok' | 'error' | null
  const [busy, setBusy] = useState(false)

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nom || !form.email || !form.sujet || !form.message) {
      setStatus('error')
      return
    }
    setBusy(true)
    try {
      await addDoc(collection(db, 'messages'), { ...form, createdAt: serverTimestamp() })
      setForm({ nom: '', email: '', sujet: '', message: '' })
      setStatus('ok')
    } catch {
      setStatus('error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <h1 className="font-display text-3xl text-ember mb-6">Contact</h1>
      {status === 'ok' && (
        <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/40 text-green-300 text-sm p-3">
          Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-sm p-3">
          Veuillez remplir tous les champs du formulaire.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-courtdeep p-8">
        <input required placeholder="Nom" value={form.nom} onChange={update('nom')} className={inputClass} />
        <input required type="email" placeholder="Email" value={form.email} onChange={update('email')} className={inputClass} />
        <input required placeholder="Sujet" value={form.sujet} onChange={update('sujet')} className={inputClass} />
        <textarea required rows={5} placeholder="Message" value={form.message} onChange={update('message')} className={inputClass} />
        <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold disabled:opacity-50">
          {busy ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </div>
  )
}

const inputClass = 'w-full rounded-lg bg-court border border-line px-3 py-2 outline-none focus:border-ember'
