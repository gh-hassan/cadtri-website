"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { glossaryTerms, CATEGORIES, CATEGORY_COLORS } from "./glossary-data";
import type { GlossaryCategory } from "./glossary-data";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="glossary-highlight">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

export function GlossarySearch() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return glossaryTerms.filter((t) => {
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        (t.abbr?.toLowerCase().includes(q) ?? false) ||
        t.definition.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || t.category === activeCategory;
      const firstLetter = t.term[0].toUpperCase();
      const matchesLetter = !activeLetter || firstLetter === activeLetter;
      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [query, activeCategory, activeLetter]);

  // Letters that have at least one result
  const availableLetters = useMemo(() => {
    const q = query.toLowerCase().trim();
    return new Set(
      glossaryTerms
        .filter((t) => {
          const matchesSearch =
            !q ||
            t.term.toLowerCase().includes(q) ||
            (t.abbr?.toLowerCase().includes(q) ?? false) ||
            t.definition.toLowerCase().includes(q);
          const matchesCategory = !activeCategory || t.category === activeCategory;
          return matchesSearch && matchesCategory;
        })
        .map((t) => t.term[0].toUpperCase()),
    );
  }, [query, activeCategory]);

  // Reset active letter if it's no longer available
  useEffect(() => {
    if (activeLetter && !availableLetters.has(activeLetter)) {
      setActiveLetter(null);
    }
  }, [activeLetter, availableLetters]);

  function clearAll() {
    setQuery("");
    setActiveCategory(null);
    setActiveLetter(null);
    inputRef.current?.focus();
  }

  const hasFilters = query || activeCategory || activeLetter;

  return (
    <>
      <style>{`
        .glossary-highlight {
          background: #FF6D1F22;
          color: #C04C00;
          border-radius: 2px;
          padding: 0 2px;
        }
        .glossary-card {
          transition: box-shadow 0.18s ease, transform 0.18s ease;
        }
        .glossary-card:hover {
          box-shadow: 0 4px 24px 0 rgba(34,34,34,0.09);
          transform: translateY(-1px);
        }
        .letter-btn {
          transition: background 0.12s, color 0.12s, transform 0.12s;
        }
        .letter-btn:hover:not(:disabled) {
          transform: scale(1.15);
        }
        .cat-chip {
          transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s;
        }
        .cat-chip:hover {
          transform: scale(1.03);
        }
        .glossary-term-detail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.25s;
          opacity: 0;
        }
        .glossary-term-detail.open {
          max-height: 300px;
          opacity: 1;
        }
        .search-box {
          transition: box-shadow 0.2s;
        }
        .search-box:focus-within {
          box-shadow: 0 0 0 3px #FF6D1F33;
        }
      `}</style>

      {/* ── Search bar ─────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div
          className="search-box flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4"
          style={{ borderColor: "#E2D4B8" }}
        >
          {/* magnifier */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#7A6E5F", flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search a term — try "CAD", "permit", "setback"…'
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted/60"
            style={{ color: "#222222", fontFamily: "var(--font-sans)" }}
            autoComplete="off"
            spellCheck={false}
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-primary"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* result count */}
        <p className="mt-3 text-[12px] font-medium uppercase tracking-widest text-muted">
          {filtered.length === glossaryTerms.length
            ? `${glossaryTerms.length} terms in the glossary`
            : `${filtered.length} of ${glossaryTerms.length} terms`}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="ml-3 text-secondary underline underline-offset-2 hover:no-underline"
            >
              Clear filters
            </button>
          )}
        </p>
      </div>

      {/* ── Category chips ─────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const colors = CATEGORY_COLORS[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className="cat-chip rounded-full border px-4 py-1.5 text-[12px] font-medium"
              style={
                isActive
                  ? {
                      background: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                      fontFamily: "var(--font-sans)",
                    }
                  : {
                      background: "transparent",
                      color: "#7A6E5F",
                      borderColor: "#E2D4B8",
                      fontFamily: "var(--font-sans)",
                    }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Alphabet quick-jump ────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap gap-1">
        {ALPHABET.map((letter) => {
          const available = availableLetters.has(letter);
          const isActive = activeLetter === letter;
          return (
            <button
              key={letter}
              disabled={!available}
              onClick={() => setActiveLetter(isActive ? null : letter)}
              className="letter-btn flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-bold"
              style={{
                background: isActive ? "#222222" : available ? "#F5E7C6" : "transparent",
                color: isActive ? "#FAF3E1" : available ? "#222222" : "#C4B8A8",
                cursor: available ? "pointer" : "not-allowed",
                fontFamily: "var(--font-heading)",
              }}
              aria-label={`Filter by ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* ── Results ────────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span style={{ fontSize: 48 }}>🔍</span>
          <p
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-heading)", color: "#222222" }}
          >
            No terms found
          </p>
          <p className="text-muted">
            Try a different search or{" "}
            <button onClick={clearAll} className="text-secondary underline underline-offset-2">
              clear filters
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((term) => {
            const colors = CATEGORY_COLORS[term.category];
            const isExpanded = expandedTerm === term.term;
            const displayName = term.abbr
              ? `${term.abbr} — ${term.term}`
              : term.term;

            return (
              <article
                key={term.term}
                className="glossary-card cursor-pointer rounded-2xl border border-border bg-white"
                style={{ borderColor: "#E2D4B8" }}
                onClick={() => setExpandedTerm(isExpanded ? null : term.term)}
              >
                <div className="flex items-start gap-4 px-6 py-5">
                  {/* left: initial letter pill */}
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {term.abbr ? term.abbr[0] : term.term[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3
                        className="text-base font-bold leading-tight"
                        style={{ fontFamily: "var(--font-heading)", color: "#222222" }}
                      >
                        {highlight(displayName, query)}
                      </h3>
                      <span
                        className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                        style={{
                          background: colors.bg,
                          color: colors.text,
                          borderColor: colors.border,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {term.category}
                      </span>
                    </div>

                    {/* preview line — first ~90 chars of definition */}
                    {!isExpanded && (
                      <p
                        className="mt-1 line-clamp-1 text-sm text-muted"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {term.definition}
                      </p>
                    )}
                  </div>

                  {/* expand chevron */}
                  <div
                    className="mt-1 shrink-0 text-muted"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* expanded definition */}
                <div className={`glossary-term-detail ${isExpanded ? "open" : ""}`}>
                  <div
                    className="border-t px-6 pb-6 pt-4 text-sm leading-relaxed text-muted"
                    style={{ borderColor: "#F5E7C6", fontFamily: "var(--font-sans)" }}
                  >
                    {highlight(term.definition, query)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
