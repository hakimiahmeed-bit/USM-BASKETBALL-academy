import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function AdminLayout() {
  const navigate = useNavigate()
  async function handleLogout() {
    await signOut(auth)
    navigate('/')
  }
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-bold ${isActive ? 'bg-ember text-court' : 'border border-line text-slate-300'}`

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-courtdeep/95 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/admin" className="font-display text-xl text-ember">BASKET ACADEMY — ADMIN</Link>
          <div className="flex items-center gap-2">
            <NavLink to="/admin" end className={linkClass}>Gestion Joueurs</NavLink>
            <NavLink to="/admin/messages" className={linkClass}>Messages</NavLink>
            <Link to="/" className="px-4 py-2 rounded-full border border-line text-slate-300 text-sm font-bold">Site Web</Link>
            <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-red-500 text-red-400 text-sm font-bold">
              Déconnexion
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
