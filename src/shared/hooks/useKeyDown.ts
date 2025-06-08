import { useEffect } from "react";

type UseKeyDownPrams = {
  keys: string[];
  callback: () => void;
};

const useKeyDown = ({ keys, callback }: UseKeyDownPrams) => {
  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callback();
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [keys, callback]);
};

export default useKeyDown;
