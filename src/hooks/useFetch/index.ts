import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);

        if (res.status === 404) throw new Error('요청받은 페이지를 찾을 수 없습니다. 주소가 정확한지 확인해주세요.');

        if (!res.ok) {
          throw new Error(
            '서버 내부에서 오류가 발생했습니다. 해당 오류가 지속적으로 발생한다면 관리자에게 문의해주세요.',
          );
        }

        const data = await res.json();
        setData(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (error instanceof Error) setErrorMessage(error.message);
      }
    }

    fetchData();
  }, []);

  return { data, status, errorMessage };
};

export default useFetch;
