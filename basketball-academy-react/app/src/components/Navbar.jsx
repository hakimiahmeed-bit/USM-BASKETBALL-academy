import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'

const categoryToPath = {
  poussin: '/espace/poussin',
  benjamin: '/espace/benjamin',
  jeunes: '/espace/academie-jeunes',
  senior: '/espace/academie-seniors',
}

function spacePathFor(categorie) {
  const cat = (categorie || '').toLowerCase()
  if (cat.includes('poussin')) return categoryToPath.poussin
  if (cat.includes('benjamin')) return categoryToPath.benjamin
  if (cat.includes('jeunes')) return categoryToPath.jeunes
  if (cat.includes('senior')) return categoryToPath.senior
  return '/'
}

export default function Navbar() {
  const { user, profile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    setOpen(false)
    await signOut(auth)
    navigate('/')
  }

  function close() {
    setOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
      isActive ? 'text-ember' : 'text-slate-300 hover:text-ember'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
      isActive ? 'bg-ember/10 text-ember' : 'text-slate-200 hover:bg-white/5'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-courtdeep/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" onClick={close} className="flex items-center gap-2 font-display text-2xl text-ember">
          <img src="/logoo.png" alt="" className="h-9 w-9 object-contain" onError={(e) => (e.target.style.display = 'none')} />
          BASKET ACADEMY
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          <NavLink to="/" className={linkClass} end>Accueil</NavLink>
          <NavLink to="/equipe" className={linkClass}>Notre Équipe</NavLink>
          <NavLink to="/inscription" className={linkClass}>Inscription</NavLink>
          {!isAdmin && <NavLink to="/contact" className={linkClass}>Contact</NavLink>}

          {isAdmin ? (
            <>
              <Link to="/admin" className="ml-3 px-4 py-2 rounded-full bg-ember text-court text-sm font-bold hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-shadow">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded-full border border-red-500 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors">
                Déconnexion
              </button>
            </>
          ) : user ? (
            <>
              <Link to={spacePathFor(profile?.categorie)} className="ml-3 px-4 py-2 rounded-full bg-ember text-court text-sm font-bold hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-shadow">
                Mon Espace
              </Link>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded-full border border-red-500 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors">
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/connexion" className="ml-3 px-4 py-2 rounded-full border border-ember text-ember text-sm font-bold hover:bg-ember hover:text-court hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all">
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-line"
        >
          <span className={`block w-5 h-0.5 bg-ember transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ember transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ember transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-line bg-courtdeep px-4 py-3 space-y-1">
          <NavLink to="/" className={mobileLinkClass} end onClick={close}>Accueil</NavLink>
          <NavLink to="/equipe" className={mobileLinkClass} onClick={close}>Notre Équipe</NavLink>
          <NavLink to="/inscription" className={mobileLinkClass} onClick={close}>Inscription</NavLink>
          {!isAdmin && <NavLink to="/contact" className={mobileLinkClass} onClick={close}>Contact</NavLink>}

          <div className="pt-2">
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={close} className="block text-center px-4 py-3 rounded-xl bg-ember text-court text-sm font-bold mb-2">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full text-center px-4 py-3 rounded-xl border border-red-500 text-red-400 text-sm font-bold">
                  Déconnexion
                </button>
              </>
            ) : user ? (
              <>
                <Link to={spacePathFor(profile?.categorie)} onClick={close} className="block text-center px-4 py-3 rounded-xl bg-ember text-court text-sm font-bold mb-2">
                  Mon Espace
                </Link>
                <button onClick={handleLogout} className="w-full text-center px-4 py-3 rounded-xl border border-red-500 text-red-400 text-sm font-bold">
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/connexion" onClick={close} className="block text-center px-4 py-3 rounded-xl border border-ember text-ember text-sm font-bold">
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
