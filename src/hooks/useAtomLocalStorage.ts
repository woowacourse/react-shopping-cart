import { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

const useAtomLocalStorage = <T>(
  initialValue: RecoilState<T>,
  key: string
): [T, (data: T) => void] => {
  const [value, setData] = useRecoilState(initialValue);

  const setValue = (data: T) => {
    setData(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  useEffect(() => {
    const saveData = JSON.parse(
      localStorage.getItem(key) || JSON.stringify(initialValue)
    );
    if (saveData && saveData.length > 0) {
      setData(saveData);
    }
  }, [key, setData, initialValue]);

  return [value, setValue];
};

export default useAtomLocalStorage;
