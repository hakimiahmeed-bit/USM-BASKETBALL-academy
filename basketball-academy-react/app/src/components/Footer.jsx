export default function Footer() {
  return (
    <footer className="border-t border-line bg-courtdeep py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Basket Academy — Tous droits réservés.
      </div>
    </footer>
  )
}
