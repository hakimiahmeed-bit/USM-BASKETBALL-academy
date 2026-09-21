import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Loading />
  if (!user) return <Navigate to="/connexion" replace />
  return children
}

export function RequireAdmin({ children }) {
  const { user, profile, loading, isAdmin } = useAuth()
  if (loading) return <Loading />
  if (!user) return <Navigate to="/connexion" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-ember font-display text-xl">
      Chargement...
    </div>
  )
}
