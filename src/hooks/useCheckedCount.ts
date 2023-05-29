import { useRecoilValue } from 'recoil';

import { checkedCartProductCountSelector } from '../states/checkedCartProducts';

const useCheckedCount = () => {
  const checkedCount = useRecoilValue(checkedCartProductCountSelector);

  return checkedCount;
};

export default useCheckedCount;
