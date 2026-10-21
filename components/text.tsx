import { Fragment } from "react";

const SPLIT = /(\[KHALID:[^\]]*\])/g;
const IS_TODO = /^\[KHALID:[^\]]*\]$/;

/** Renders content text; any "[KHALID: …]" becomes a visible placeholder. */
export function Text({ children }: { children: string }) {
  const parts = children.split(SPLIT);
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) =>
        IS_TODO.test(part) ? (
          <span key={i} className="todo" title="Placeholder: Khalid to fill in">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export const isTodo = (s?: string) => !!s && s.includes("[KHALID:");
