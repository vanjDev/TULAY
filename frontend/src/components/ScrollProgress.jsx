import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ width: `${p}%` }} />
    </div>
  );
}
