import { useEffect, useMemo, useRef, useState } from "react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=<>?/";

function pick(str) {
  return str[Math.floor(Math.random() * str.length)];
}

export default function GlitchType({
  text,
  className = "",
  as: Tag = "span",

  speed = 120,
  startDelay = 250,
  glitchTail = 4,
  glitchChars = GLITCH_CHARS,

  // NEW: parent-controlled restart trigger
  restartKey = 0,

  blinkCursor = true,
  cursorClassName = "glitch-cursor",
}) {
  const finalText = useMemo(() => String(text ?? ""), [text]);

  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  const intervalRef = useRef(null);
  const delayRef = useRef(null);

  useEffect(() => {
    // reset
    setCount(0);
    setDone(false);

    if (delayRef.current) clearTimeout(delayRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    delayRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCount((c) => {
          const next = c + 1;
          if (next >= finalText.length) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setDone(true);
            return finalText.length;
          }
          return next;
        });
      }, speed);
    }, startDelay);

    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [finalText, speed, startDelay, restartKey]); 
  const stable = finalText.slice(0, count);
  const tail = done
    ? ""
    : Array.from({ length: glitchTail }, () => pick(glitchChars)).join("");

  return (
    <Tag className={className} aria-label={finalText}>
      <span className="glitch-stable">{stable}</span>
      {!done && <span className="glitch-tail">{tail}</span>}
      {blinkCursor && (
        <span
          className={done ? `${cursorClassName} is-done` : cursorClassName}
          aria-hidden="true"
        >
          ▍
        </span>
      )}
    </Tag>
  );
}
