import { useEffect, useRef } from "react";

interface UseOutsideClickProps {
  callback: () => void;
}

const useOutsideClick = ({ callback }: UseOutsideClickProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return { ref };
};

export default useOutsideClick;
