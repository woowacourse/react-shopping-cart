import { useSetRecoilState } from 'recoil';
import { TOAST_TYPE } from '../constants';
import { $ToastStateList } from '../recoil/atom';

const useToast = () => {
  const setToastStateList = useSetRecoilState($ToastStateList);
  const { SUCCESS, ERROR, WARNING } = TOAST_TYPE;
  const success = (message: string) => setToastStateList(prev => [...prev, { type: SUCCESS, message }]);
  const error = (message: string) => setToastStateList(prev => [...prev, { type: ERROR, message }]);
  const warning = (message: string) => setToastStateList(prev => [...prev, { type: WARNING, message }]);
  const reset = () => setToastStateList([]);

  return { success, error, warning, reset };
};

export default useToast;
