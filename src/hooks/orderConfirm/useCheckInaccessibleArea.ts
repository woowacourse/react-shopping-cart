import { PRICE } from '@constants/shippingCart';
import { useOrderCosts } from '@hooks/shoppingCart';
import { isInaccessibleAreaAtom } from '@recoil/orderConfirm';
import { useRecoilState } from 'recoil';

const useCheckInaccessibleArea = () => {
  const { orderPrice } = useOrderCosts();

  const [isInaccessibleArea, setIsInaccessibleArea] = useRecoilState(isInaccessibleAreaAtom);

  const handleChangeInaccessibleAreaCheckBox = () => setIsInaccessibleArea((prev) => !prev);

  const isDisabledInaccessibleAreaCheckBox = orderPrice >= PRICE.freeShippingMinAmount;

  return {
    isInaccessibleArea,
    handleChangeInaccessibleAreaCheckBox,
    isDisabledInaccessibleAreaCheckBox,
  };
};

export default useCheckInaccessibleArea;
