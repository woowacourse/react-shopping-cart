import { useRecoilValue } from 'recoil';

import { checkedCartProductCountState } from '../states/checkedCartProducts';

const useCheckedCount = () => {
  const checkedCount = useRecoilValue(checkedCartProductCountState);

  return checkedCount;
};

export default useCheckedCount;
