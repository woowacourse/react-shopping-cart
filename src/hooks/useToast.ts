import { useSetRecoilState } from 'recoil';
import { $ToastStateList } from '../recoil/atom';

const useToast = () => {
  const setToastStateList = useSetRecoilState($ToastStateList);

  const success = (message: string) => setToastStateList(prev => [...prev, { type: 'success', message }]);
  const error = (message: string) => setToastStateList(prev => [...prev, { type: 'error', message }]);
  const warning = (message: string) => setToastStateList(prev => [...prev, { type: 'warning', message }]);
  const reset = () => setToastStateList([]);

  return { success, error, warning, reset };
};

export default useToast;
