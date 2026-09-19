import { Link } from 'react-router-dom'

const categories = [
  { name: 'Poussin U10', age: '5 – 9 ans', desc: 'Premiers pas dans le basket : coordination, jeu et plaisir.' },
  { name: 'Benjamin U12', age: '10 – 13 ans', desc: "Apprentissage des fondamentaux techniques et de l'esprit d'équipe." },
  { name: 'Académie Jeunes', age: '14 – 18 ans', desc: 'Formation intensive orientée compétition.' },
  { name: 'Académie Seniors', age: '18 ans et +', desc: 'Perfectionnement et compétition régionale.' },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-none text-white">
              Formez votre <span className="text-ember">jeu</span>, dès le premier dribble.
            </h1>
            <p className="mt-6 text-slate-300 max-w-md">
              Basket Academy accompagne les joueurs de 5 à 18 ans et plus, du premier
              panier jusqu'à la compétition, avec un encadrement structuré par catégorie d'âge.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/inscription" className="px-6 py-3 rounded-full bg-ember text-court font-bold">
                S'inscrire
              </Link>
              <Link to="/equipe" className="px-6 py-3 rounded-full border border-line text-slate-200 font-bold">
                Notre équipe
              </Link>
            </div>
          </div>
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-line to-courtdeep border border-line flex items-center justify-center">
            <span className="font-display text-9xl text-ember/20">24</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-10">Catégories d'âge</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <div key={c.name} className="p-5 rounded-2xl bg-courtdeep border border-line">
              <div className="text-ember font-display text-2xl">{c.name}</div>
              <div className="text-sm text-slate-400 mt-1">{c.age}</div>
              <p className="mt-3 text-sm text-slate-300">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
