const staff = [
  { nom: 'Coach Principal', role: 'Entraîneur Chef — Académie Seniors' },
  { nom: 'Coach Adjoint', role: 'Entraîneur — Académie Jeunes' },
  { nom: 'Responsable Formation', role: 'Entraîneur — Poussin & Benjamin' },
  { nom: 'Préparateur Physique', role: 'Conditionnement athlétique' },
]

export default function Staff() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl text-ember mb-10">Notre Équipe</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {staff.map((s) => (
          <div key={s.nom} className="rounded-2xl border border-line bg-courtdeep p-5 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-line mb-4" />
            <div className="font-bold">{s.nom}</div>
            <div className="text-sm text-slate-400">{s.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
