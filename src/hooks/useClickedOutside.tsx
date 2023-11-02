import { useEffect, useRef } from "react";

const useClickedOutside = (fn: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) {
        console.log(ref);
        fn();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, [fn]);

  return ref;
};

export default useClickedOutside;
