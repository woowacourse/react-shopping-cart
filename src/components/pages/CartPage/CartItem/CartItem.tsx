import { memo, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { productToggleSelector } from '../../../../recoil/cartToggleState';
import { SquareImage } from '../../../commons/SquareImage/SquareImage.styled';
import Stepper from '../../../commons/Stepper/Stepper';

import useStepper from '../../../../hooks/useStepper';
import usePreviousValue from '../../../../hooks/usePreviousValue';
import { productCountSelector } from '../../../../recoil/cartState';
import { Product } from '../../../../types/Product';
import StepperSettings from '../../../../constants/StepperSettings';

interface CartSingleItemProps extends Product {
  quantity: number;
}

const { MIN, MAX, STEP } = StepperSettings;

const CartSingleItem = (props: CartSingleItemProps) => {
  const { id, quantity, name, imageUrl, price } = props;

  const updateProductQuantity = useSetRecoilState(productCountSelector(id));
  const [isToggled, setIsToggled] = useRecoilState(productToggleSelector(id));
  const deleteToggled = useResetRecoilState(productToggleSelector(id));

  const { value, increaseValue, decreaseValue, setValue } = useStepper(
    MIN + 1,
    MAX,
    STEP,
    quantity
  );
  const prevValue = usePreviousValue(value);

  const deleteProduct = () => {
    fetch(`/cart-items/${id}`, { method: 'DELETE' });
    updateProductQuantity(0);
    deleteToggled();
  };

  useEffect(() => {
    if (prevValue === value) return;

    fetch(`/cart-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: value }),
    });
  }, [value]);

  useEffect(() => {
    updateProductQuantity(value);
  }, [value]);

  return (
    <div>
      <input
        type="checkbox"
        aria-label="장바구니에 상품 담기"
        defaultChecked={isToggled}
        onClick={() => setIsToggled((prev) => !prev)}
      />
      <SquareImage size="l" src={imageUrl} alt="" />
      <p>{name}</p>
      <div>
        <button type="button" onClick={deleteProduct}>
          삭제하기
        </button>
        <Stepper
          value={value}
          increaseValue={increaseValue}
          decreaseValue={decreaseValue}
          setValue={setValue}
        />
        <p>{value * price}</p>
      </div>
    </div>
  );
};

export default memo(CartSingleItem);
