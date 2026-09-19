import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)       // Firebase Auth user
  const [profile, setProfile] = useState(null) // Firestore users/{uid} doc
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubProfile = () => {}
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      unsubProfile()
      setUser(firebaseUser)
      if (firebaseUser) {
        unsubProfile = onSnapshot(doc(db, 'users', firebaseUser.uid), (snap) => {
          setProfile(snap.exists() ? { id: snap.id, ...snap.data() } : null)
          setLoading(false)
        })
      } else {
        setProfile(null)
        setLoading(false)
      }
    })
    return () => {
      unsubAuth()
      unsubProfile()
    }
  }, [])

  const value = { user, profile, loading, isAdmin: profile?.role === 'admin' }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
