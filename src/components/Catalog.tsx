import { useMemo, useState } from "react";
import { formatScore, type Book, type Category } from "../data/books"

type Filter = "todos" | Category
type Sort = "score" | "recent"

const PAGE_SIZE = 3

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "ficcion", label: "Ficción Contemporánea" },
  { id: "terror", label: "Terror & Thriller" },
  { id: "scifi", label: "Ciencia Ficción" },
  { id: "ensayo", label: "Ensayo" },
]

const sorts: { id: Sort; label: string }[] = [
  { id: "score", label: "Por nota más alta" },
  { id: "recent", label: "Más recientes" },
]

const verdictClass = {
  paper: "text-gold-soft",
  muted: "text-muted",
  blush: "text-blush",
};

interface Props {
  books: Book[]
}

export default function Catalog({ books }: Props) {
  const [filter, setFilter] = useState<Filter>("todos")
  const [sort, setSort] = useState<Sort>("score")
  const [limit, setLimit] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const list = books.filter((book) => filter === "todos" || book.category === filter);
    return [...list].sort((a, b) =>
      sort === "score" ? b.score - a.score || a.recentRank - b.recentRank : a.recentRank - b.recentRank,
    )
  }, [books, filter, sort])

  const shown = filtered.slice(0, limit);
  const remaining = filtered.length - shown.length;
  const activeLabel = filters.find((item) => item.id === filter)?.label ?? "esta selección";

  function chooseFilter(next: Filter) {
    setFilter(next);
    setLimit(PAGE_SIZE);
  }

  function chooseSort(next: Sort) {
    setSort(next);
    setLimit(PAGE_SIZE);
  }

  return (
    <div>
      <div className="mt-7 mb-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-5.5" role="tablist" aria-label="Género">
          {filters.map((item) => {
            const on = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => chooseFilter(item.id)}
                className={
                  on
                    ? "border-b-2 border-coral pb-1 text-sm font-semibold text-paper"
                    : "pb-1 text-sm font-semibold text-muted transition-transform hover:-translate-y-0.5"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1 self-start bg-card p-1">
          {sorts.map((item) => {
            const on = item.id === sort;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => chooseSort(item.id)}
                className={
                  on
                    ? "bg-surface px-2 py-1.5 text-[11px] font-medium tracking-[0.04em] text-paper"
                    : "px-2 py-1.5 text-[11px] font-medium tracking-[0.04em] text-muted transition-transform hover:-translate-y-0.5"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-5 flex flex-col gap-1 bg-deep px-3 py-2 text-[11px] tracking-[0.06em] text-muted sm:flex-row sm:justify-between">
        <span>Mostrando los veredictos más influyentes de la temporada editorial</span>
        <span>FORMATO DE LECTURA RÁPIDA</span>
      </p>

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((book) => (
            <a
              key={book.slug}
              href={`/books/${book.slug}`}
              className="flex flex-col gap-3 bg-card p-4 text-left transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            >
              <div className="relative">
                <img className="h-80 w-full bg-surface object-cover" src={book.cover} alt="" width="280" height="320" />
                <span
                  className={
                    book.score >= 9
                      ? "absolute top-3 right-3 bg-coral px-2 py-0.5 text-sm font-semibold text-ink"
                      : "absolute top-3 right-3 bg-gold px-2 py-0.5 text-sm font-semibold text-gold-deep"
                  }
                >
                  {formatScore(book.score)}
                </span>
                <span
                  className={
                    book.chipTone === "gold"
                      ? "absolute bottom-3 left-3 bg-deep px-2 py-0.5 text-[11px] text-gold-soft"
                      : "absolute bottom-3 left-3 bg-deep px-2 py-0.5 text-[11px] text-lilac"
                  }
                >
                  {book.chip}
                </span>
              </div>
              <div className="flex justify-between text-[11px] tracking-[0.08em] text-muted uppercase">
                <span>{book.author}</span>
                <span className="normal-case">{book.pages} págs</span>
              </div>
              <h2 className="font-display text-xl">{book.title}</h2>
              <p className="font-serif text-[17px] leading-snug text-muted">{book.line}</p>
              <div className="mt-auto flex items-center justify-between text-[11px] tracking-[0.04em]">
                <span className={verdictClass[book.verdictTone]}>{book.verdict}</span>
                <span className="text-gold-soft">Leer crítica</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="py-6 font-serif text-muted">Sin títulos de {activeLabel.toLowerCase()} en el archivo.</p>
      )}

      {filtered.length > 0 && (
        <div className="mt-7 text-center">
          {remaining > 0 ? (
            <button
              type="button"
              onClick={() => setLimit(filtered.length)}
              className="text-xs font-semibold tracking-[0.08em] text-muted transition-colors hover:text-blush"
            >
              MOSTRAR MÁS LECTURAS ANALIZADAS ({remaining} MÁS)
            </button>
          ) : (
            filtered.length > PAGE_SIZE && (
              <p className="text-xs font-semibold tracking-[0.08em] text-muted">
                SELECCIÓN COMPLETA <span className="ml-2 inline-block animate-pop text-gold">✓</span>
              </p>
            )
          )}
          <p className="mt-2.5 text-xs text-muted">
            Mostrando {shown.length} de {filtered.length} volúmenes en el archivo personal
          </p>
        </div>
      )}
    </div>
  );
}