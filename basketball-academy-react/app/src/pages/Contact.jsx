import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [status, setStatus] = useState(null)
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
    <div>
      <div className="bg-court border-b-4 border-ember py-12 text-center px-4">
        <h1 className="text-3xl font-bold text-ember">Contact</h1>
        <p className="text-slate-300 mt-1">Une question ? Écrivez-nous.</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-12">
        {status === 'ok' && (
          <div className="mb-4 rounded-lg bg-green-100 border border-green-400 text-green-800 text-sm p-3">
            Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-4 rounded-lg bg-red-100 border border-red-400 text-red-800 text-sm p-3">
            Veuillez remplir tous les champs du formulaire.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white shadow p-8">
          <input required placeholder="Nom" value={form.nom} onChange={update('nom')} className={inputClass} />
          <input required type="email" placeholder="Email" value={form.email} onChange={update('email')} className={inputClass} />
          <input required placeholder="Sujet" value={form.sujet} onChange={update('sujet')} className={inputClass} />
          <textarea required rows={5} placeholder="Message" value={form.message} onChange={update('message')} className={inputClass} />
          <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold disabled:opacity-50">
            {busy ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  )
}

const inputClass = 'w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-ember'
