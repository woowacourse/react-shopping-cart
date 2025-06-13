import { useState } from "react";
import { useErrorContext } from "../context/errorProvider";

export function useAsync<TArgs extends any[]>(
  asyncFn: (...args: TArgs) => Promise<Response>,
  errorMessage: string
) {
  const [loading, setLoading] = useState(false);
  const { setError } = useErrorContext();

  const run = async (...args: TArgs) => {
    setLoading(true);
    try {
      const response = await asyncFn(...args);
      if (!response.ok)
        throw new Error(`잘못된 접근입니다: ${response.status}`);
      return response;
    } catch (error) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { run, loading };
}
