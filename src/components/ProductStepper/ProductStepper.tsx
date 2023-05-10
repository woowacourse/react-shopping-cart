import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import myCartState from '../../recoil/myCartState';

import StepperEntryButton from '../StepperEntryButton/StepperEntryButton';
import Stepper from '../commons/Stepper/Stepper';

interface ProductStepperProps {
  productId: number;
}

const ProductStepper = (props: ProductStepperProps) => {
  const { productId } = props;

  const [myCart, setMyCart] = useRecoilState(myCartState);

  const [productCount, setProductCount] = useState(
    () => myCart[productId] ?? 0
  );

  const handleCartButtonClick = () => {
    setProductCount(prev => prev + 1);
  };

  useEffect(() => {
    setMyCart(prevCart => {
      const newCart = { ...prevCart };

      newCart[productId] = productCount;

      if (productCount === 0) {
        delete newCart[productId];
      }

      return newCart;
    });
  }, [productCount]);

  return productCount === 0 ? (
    <StepperEntryButton onClick={handleCartButtonClick} />
  ) : (
    <Stepper productCount={productCount} setProductCount={setProductCount} />
  );
};

export default ProductStepper;
