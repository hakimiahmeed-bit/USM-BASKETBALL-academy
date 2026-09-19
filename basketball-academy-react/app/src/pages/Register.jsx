import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

function determinerCategorie(dateNaissance) {
  if (!dateNaissance) return 'Poussin U10'
  const dob = new Date(dateNaissance)
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--

  if (age >= 5 && age <= 9) return 'Poussin U10'
  if (age >= 10 && age <= 13) return 'Benjamin U12'
  if (age >= 14 && age <= 18) return 'Académie Jeunes (U18)'
  return 'Académie Seniors'
}

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', password: '', confirm: '', dateNaissance: '', categorie: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.nom || !form.email || !form.password || !form.confirm || !form.dateNaissance) {
      setError('Veuillez remplir tous les champs obligatoires !')
      return
    }
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas !')
      return
    }
    setBusy(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const categorie = form.categorie || determinerCategorie(form.dateNaissance)
      await setDoc(doc(db, 'users', cred.user.uid), {
        nom: form.nom,
        email: form.email,
        categorie,
        dateNaissance: form.dateNaissance,
        role: 'client',
        statut: 'En attente',
        dateDernierPaiement: null,
        createdAt: serverTimestamp(),
      })
      navigate('/connexion?inscrit=1')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('Cet email est déjà utilisé !')
      else if (err.code === 'auth/weak-password') setError('Le mot de passe doit contenir au moins 6 caractères.')
      else setError("Une erreur est survenue. Vérifiez l'adresse email.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-court text-white min-h-[80vh]">
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="rounded-2xl border border-line bg-courtdeep p-8">
        <h1 className="font-display text-3xl text-ember mb-6">Inscription</h1>
        {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-sm p-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nom complet"><input required value={form.nom} onChange={update('nom')} className={inputClass} /></Field>
          <Field label="Email"><input type="email" required value={form.email} onChange={update('email')} className={inputClass} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Mot de passe"><input type="password" required value={form.password} onChange={update('password')} className={inputClass} /></Field>
            <Field label="Confirmer"><input type="password" required value={form.confirm} onChange={update('confirm')} className={inputClass} /></Field>
          </div>
          <Field label="Date de naissance"><input type="date" required value={form.dateNaissance} onChange={update('dateNaissance')} className={inputClass} /></Field>
          <Field label="Catégorie (optionnel — calculée automatiquement sinon)">
            <select value={form.categorie} onChange={update('categorie')} className={inputClass}>
              <option value="">Automatique selon l'âge</option>
              <option>Poussin U10</option>
              <option>Benjamin U12</option>
              <option>Académie Jeunes (U18)</option>
              <option>Académie Seniors</option>
            </select>
          </Field>
          <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold hover:shadow-[0_0_18px_rgba(255,193,7,0.5)] transition-shadow disabled:opacity-50">
            {busy ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>
        <p className="text-sm text-slate-400 mt-4">
          Déjà inscrit ? <Link to="/connexion" className="text-ember">Connectez-vous</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

const inputClass = 'w-full rounded-lg bg-court border border-line px-3 py-2 outline-none focus:border-ember'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      {children}
    </div>
  )
}
