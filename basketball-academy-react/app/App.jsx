import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLayout from './components/AdminLayout'
import { RequireAuth, RequireAdmin } from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Staff from './pages/Staff'
import Profile from './pages/Profile'
import Espace from './pages/Espace'
import Dashboard from './pages/admin/Dashboard'
import AdminMessages from './pages/admin/Messages'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Dashboard />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/connexion" element={<Login />} />
                  <Route path="/inscription" element={<Register />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/equipe" element={<Staff />} />
                  <Route path="/profil" element={<RequireAuth><Profile /></RequireAuth>} />
                  <Route path="/espace/poussin" element={<RequireAuth><Espace category="poussin" /></RequireAuth>} />
                  <Route path="/espace/benjamin" element={<RequireAuth><Espace category="benjamin" /></RequireAuth>} />
                  <Route path="/espace/academie-jeunes" element={<RequireAuth><Espace category="academie-jeunes" /></RequireAuth>} />
                  <Route path="/espace/academie-seniors" element={<RequireAuth><Espace category="academie-seniors" /></RequireAuth>} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}
