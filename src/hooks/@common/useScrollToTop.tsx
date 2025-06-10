import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
};

export default useScrollToTop;
