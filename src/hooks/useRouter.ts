import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();

  const goPage = (path: string) => () => {
    navigate(path);
  };

  return { goPage };
};
