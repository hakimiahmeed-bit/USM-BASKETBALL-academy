import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const coords = [
  { icon: '📍', label: 'Adresse', value: 'Mourouj 1, Ben Arous, Tunisia, 1441' },
  { icon: '📞', label: 'Téléphone', value: '+216 98 790 238' },
  { icon: '✉️', label: 'Email', value: 'usmmourouj2013@gmail.com' },
  { icon: '🕐', label: "Horaires d'ouverture", value: 'Lun - Dim : 08h00 - 19h00' },
]

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

      <div className="max-w-5xl mx-auto px-4 py-12">
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

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Nos Coordonnées */}
          <div className="lg:col-span-5 bg-court text-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-ember mb-5">Nos Coordonnées</h3>
            <div className="space-y-5">
              {coords.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-ember text-court flex items-center justify-center text-lg shadow-[0_0_12px_rgba(255,193,7,0.5)]">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-ember font-bold text-sm">{c.label}</div>
                    <div className="text-slate-200 text-sm">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 rounded-full bg-ember text-court flex items-center justify-center text-lg shadow-[0_0_12px_rgba(255,193,7,0.5)]">
                  📘
                </div>
                <div>
                  <div className="text-ember font-bold text-sm">Page Facebook</div>
                  <a
                    href="https://www.facebook.com/profile.php?id=100095321656479"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-200 text-sm hover:text-ember transition-colors"
                  >
                    USM Mourouj Basketball ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white shadow-lg p-6 h-full">
              <h3 className="text-xl font-bold mb-1">Envoyez-nous un Message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nom & Prénom">
                  <input required placeholder="Votre nom" value={form.nom} onChange={update('nom')} className={inputClass} />
                </Field>
                <Field label="Adresse Email">
                  <input required type="email" placeholder="nom@example.com" value={form.email} onChange={update('email')} className={inputClass} />
                </Field>
              </div>
              <Field label="Sujet">
                <input required placeholder="Objet de votre message" value={form.sujet} onChange={update('sujet')} className={inputClass} />
              </Field>
              <Field label="Message">
                <textarea required rows={5} placeholder="Écrivez votre message ici..." value={form.message} onChange={update('message')} className={inputClass} />
              </Field>
              <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold hover:shadow-[0_0_18px_rgba(255,193,7,0.5)] transition-shadow disabled:opacity-50">
                {busy ? 'Envoi...' : 'Envoyer le Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputClass = 'w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-ember'
