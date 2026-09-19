import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const spaceFor = (cat) => {
  const c = (cat || '').toLowerCase()
  if (c.includes('poussin')) return '/espace/poussin'
  if (c.includes('benjamin')) return '/espace/benjamin'
  if (c.includes('jeunes')) return '/espace/academie-jeunes'
  if (c.includes('senior')) return '/espace/academie-seniors'
  return '/'
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const snap = await getDoc(doc(db, 'users', cred.user.uid))
      const data = snap.exists() ? snap.data() : {}
      if (data.role === 'admin') navigate('/admin')
      else navigate(spaceFor(data.categorie))
    } catch (err) {
      setError('Adresse email ou mot de passe incorrect !')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-court text-white min-h-[80vh] flex items-center">
    <div className="max-w-md mx-auto px-4 py-16 w-full">
      <div className="rounded-2xl border border-line bg-courtdeep p-8">
        <h1 className="font-display text-3xl text-ember mb-6">Connexion</h1>
        {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-sm p-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-court border border-line px-3 py-2 outline-none focus:border-ember" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mot de passe</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-court border border-line px-3 py-2 outline-none focus:border-ember" />
          </div>
          <button disabled={busy} className="w-full py-2 rounded-lg bg-ember text-court font-bold hover:shadow-[0_0_18px_rgba(255,193,7,0.5)] transition-shadow disabled:opacity-50">
            {busy ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="text-sm text-slate-400 mt-4">
          Pas encore de compte ? <Link to="/inscription" className="text-ember">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
    </div>
  )
}
