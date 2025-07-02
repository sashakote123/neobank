import { useEffect, useState } from "react";

interface HookResult {
  windowWidth: number;
}

const useResize = (): HookResult => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowWidth };
};

export default useResize;
