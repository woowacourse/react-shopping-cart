import { useSetRecoilState } from 'recoil';
import { $ToastStateList } from '../recoil/atom';

const useToast = () => {
  const setToastStateList = useSetRecoilState($ToastStateList);

  const Toast = {
    success: (message: string) => setToastStateList(prev => [...prev, { type: 'success', message }]),
    error: (message: string) => setToastStateList(prev => [...prev, { type: 'error', message }]),
    warning: (message: string) => setToastStateList(prev => [...prev, { type: 'warning', message }]),
    reset: () => setToastStateList([]),
  };

  return Toast;
};

export default useToast;
