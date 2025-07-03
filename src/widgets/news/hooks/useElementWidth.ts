import { RefObject, useEffect, useState } from "react";

const useElementWidth = (ref: RefObject<HTMLDivElement | null>): number => {
  const [newsWidth, setNewsWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setNewsWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return newsWidth;
};

export default useElementWidth;
