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

  async function handleLogout() {
    await signOut(auth)
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
      isActive ? 'text-ember' : 'text-slate-300 hover:text-ember'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-courtdeep/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl text-ember">
          <img src="/logoo.png" alt="" className="h-9 w-9 object-contain" onError={(e) => (e.target.style.display = 'none')} />
          BASKET ACADEMY
        </Link>

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
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded-full border border-red-500 text-red-400 text-sm font-bold">
                Déconnexion
              </button>
            </>
          ) : user ? (
            <>
              <Link to={spacePathFor(profile?.categorie)} className="ml-3 px-4 py-2 rounded-full bg-ember text-court text-sm font-bold hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-shadow">
                Mon Espace
              </Link>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded-full border border-red-500 text-red-400 text-sm font-bold">
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/connexion" className="ml-3 px-4 py-2 rounded-full border border-ember text-ember text-sm font-bold hover:bg-ember hover:text-court hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
