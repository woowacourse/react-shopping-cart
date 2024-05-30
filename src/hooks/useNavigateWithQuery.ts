import { useNavigate } from "react-router-dom";

interface UseNavigateWithQueryReturn {
  navigateWithQuery: (pathname: string, queryParams: Record<string, string>) => void;
}

export const useNavigateWithQuery = (): UseNavigateWithQueryReturn => {
  const navigate = useNavigate();

  const navigateWithQuery = (pathname: string, queryParams: Record<string, string>) => {
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`${pathname}?${queryString}`);
  };

  return { navigateWithQuery };
};
