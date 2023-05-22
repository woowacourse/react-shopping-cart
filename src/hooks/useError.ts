import { useRecoilState } from "recoil";
import { errorAtom } from "../store/errorState";

const useError = () => {
  const [, setError] = useRecoilState(errorAtom);

  const ChangeErrorTrue = (method: string, message: string) => {
    if (!message) message = "문제해결을 위해 아래 번호로 연락해주세요.";
    setError({ isError: true, method, message });
  };

  const ChangeErrorFalse = () => {
    setError({ isError: false, method: "", message: "" });
  };

  return { ChangeErrorTrue, ChangeErrorFalse };
};

export default useError;
