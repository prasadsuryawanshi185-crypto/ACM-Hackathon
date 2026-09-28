import Section from './Section';

export default function ProfileCards({ id, eyebrow, title, people, emptyText }) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title}>
      {people.length === 0 ? (
        <p className="card p-8 text-center text-white/60">{emptyText}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <article key={p.name} className="card p-6 text-center">
              {p.image ? <img src={p.image} alt={p.name} loading="lazy" className="mx-auto h-24 w-24 rounded-full object-cover" /> : <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-teal to-brand-purple text-2xl font-bold" aria-hidden="true">{p.name[0]}</div>}
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="text-sm text-white/60">{p.designation}{p.org && `, ${p.org}`}</p>
              {p.expertise && <p className="mt-2 text-xs text-brand-teal">{p.expertise}</p>}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
