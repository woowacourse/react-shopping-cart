import { memo, useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { productToggleSelector } from '../../../../recoil/cartToggleState';
import { SquareImage } from '../../../commons/SquareImage/SquareImage.styled';
import Stepper from '../../../commons/Stepper/Stepper';

import useStepper from '../../../../hooks/useStepper';
import usePreviousValue from '../../../../hooks/usePreviousValue';
import { productCountSelector } from '../../../../recoil/cartState';
import { Product } from '../../../../types/Product';
import StepperSettings from '../../../../constants/StepperSettings';
import CartCheckbox from '../CartCheckbox/CartCheckbox';

interface CartSingleItemProps extends Product {
  quantity: number;
}

const { MIN, MAX, STEP } = StepperSettings;

const CartSingleItem = (props: CartSingleItemProps) => {
  const { id, quantity, name, imageUrl, price } = props;

  const updateProductQuantity = useSetRecoilState(productCountSelector(id));
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
      <CartCheckbox productId={id} productName={name} />
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
