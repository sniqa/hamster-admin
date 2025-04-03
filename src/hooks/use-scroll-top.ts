import { useEffect, useState } from "react";

export const useScrollTop = () => {
  const [offset, setOffest] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffest(document.body.scrollTop || document.documentElement.scrollTop);
    };

    document.addEventListener("scroll", onScroll, { passive: true });

    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return offset;
};
