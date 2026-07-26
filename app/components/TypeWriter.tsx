"use client";

import { useEffect, useState } from "react";

export default function TypeWriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 38,
  pause = 1600,
  className = "",
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const atEnd = !deleting && text === current;
    const atStart = deleting && text === "";

    const delay = atEnd
      ? pause
      : atStart
        ? 260
        : deleting
          ? deletingSpeed
          : typingSpeed;

    // Every transition is scheduled, so state only ever changes from a timer
    // callback rather than synchronously during the effect.
    const timer = setTimeout(() => {
      if (atEnd) {
        setDeleting(true);
        return;
      }
      if (atStart) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText((prev) =>
        deleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1),
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className} aria-live="polite">
      <span className="neon-text">{text}</span>
      <span className="animate-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-neon align-middle shadow-[0_0_10px_2px_#00f0ff]" />
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
