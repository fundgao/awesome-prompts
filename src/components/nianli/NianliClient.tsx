"use client";

import { useState, useMemo } from "react";
import type { NianliEntry } from "@/data/nianli";

type Props = {
  data: NianliEntry[];
  searchPlaceholder: string;
};

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.indexOf(query);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-400/80 text-black rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function NianliClient({ data, searchPlaceholder }: Props) {
  const [query, setQuery] = useState("");
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());

  const trimmed = query.trim();

  const filtered = useMemo(() => {
    if (!trimmed) return data;
    return data
      .map((entry) => {
        const matchingTowns = entry.towns
          .map((town) => {
            const villages = town.villages.filter((v) =>
              v.includes(trimmed)
            );
            const townMatch = town.name.includes(trimmed);
            if (townMatch) return town;
            if (villages.length > 0) return { ...town, villages };
            return null;
          })
          .filter(Boolean) as NianliEntry["towns"];
        if (matchingTowns.length === 0) return null;
        return { ...entry, towns: matchingTowns };
      })
      .filter(Boolean) as NianliEntry[];
  }, [data, trimmed]);

  const autoExpanded = useMemo(
    () => new Set(trimmed ? filtered.map((e) => e.date) : []),
    [filtered, trimmed]
  );

  function toggle(date: string) {
    setOpenDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  }

  function isOpen(date: string) {
    return autoExpanded.has(date) || openDates.has(date);
  }

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full max-w-md mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
      />
      {filtered.length === 0 && (
        <p className="text-white/50 text-sm">无匹配结果</p>
      )}
      <div className="space-y-3">
        {filtered.map((entry) => {
          const open = isOpen(entry.date);
          return (
            <div key={entry.date} className="matang-card overflow-hidden">
              <button
                onClick={() => toggle(entry.date)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="matang-gold-text font-semibold text-lg">
                  {highlight(entry.date, trimmed)}
                </span>
                <span className="text-white/50 text-sm ml-4 shrink-0">
                  {open ? "▲" : "▼"}
                </span>
              </button>
              {open && (
                <div className="px-5 pb-5 space-y-3 border-t border-white/10 pt-4">
                  {entry.towns.map((town) => (
                    <div key={town.name}>
                      <span className="text-white/90 font-medium">
                        {highlight(town.name, trimmed)}：
                      </span>
                      <span className="text-white/70 text-sm leading-relaxed">
                        {town.villages.map((v, i) => (
                          <span key={i}>
                            {i > 0 && "、"}
                            {highlight(v, trimmed)}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
