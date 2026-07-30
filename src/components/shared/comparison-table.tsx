interface ComparisonTableProps {
  caption?: string;
  columns: string[];
  rows: (string | React.ReactNode)[][];
  /** Optional row index to visually emphasize (e.g., "most common" row) */
  highlightRow?: number;
}

/**
 * Data table for niche comparisons (jurisdictions, project types, formats, etc).
 * First column renders as a row header; remaining columns are data cells.
 * Scrolls horizontally on narrow viewports instead of squeezing columns.
 */
export function ComparisonTable({ caption, columns, rows, highlightRow }: ComparisonTableProps) {
  return (
    <div className="border border-border">
      {caption && (
        <p className="border-b border-border bg-surface px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-secondary">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-background">
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={
                    "px-6 py-4 text-[11px] font-medium uppercase tracking-widest text-muted " +
                    (i === 0 ? "text-foreground" : "")
                  }
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  "border-b border-border last:border-b-0 " +
                  (rowIndex === highlightRow ? "bg-surface" : "bg-background")
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cellIndex === 0
                        ? "px-6 py-4 align-top font-bold text-foreground"
                        : "px-6 py-4 align-top text-sm font-light leading-relaxed text-muted"
                    }
                    style={cellIndex === 0 ? { letterSpacing: "-0.01em" } : undefined}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
