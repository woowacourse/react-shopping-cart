import { useEffect, useState } from 'react';

import { PRODUCT_COUNT, STEP_UNIT } from '@constants/product';
import useUpdateCart from './useUpdateCart';
import { Product } from '@customTypes/Product';
import { useFetchCartItem } from './useFetchCartItem';

import StepperEntryButton from '@components/pages/ProductsPage/ProductList/ProductItem/StepperEntryButton/StepperEntryButton';
import { Stepper } from '@commons/Stepper/Stepper';

interface ProductStepperProps {
  product: Product;
  initQuantity: number;
  initCartItemId?: string | null;
  inputWidth?: string | undefined;
  inputHeight?: string | undefined;
  buttonWidth?: string | undefined;
  buttonHeight?: string | undefined;
}

const ProductStepper = (props: ProductStepperProps) => {
  const {
    product,
    initQuantity,
    initCartItemId,
    inputWidth,
    inputHeight,
    buttonWidth,
    buttonHeight,
  } = props;
  const [quantity, setQuantity] = useState(initQuantity);

  const { addCartItem, updateCartItemQuantity, deleteCartItem } =
    useFetchCartItem(product.id, initCartItemId ?? null);

  const handleStepperEntryButtonClick = () => {
    setQuantity(prev => prev + 1);
    addCartItem();
  };

  useUpdateCart(product, quantity);

  useEffect(() => {
    setQuantity(initQuantity);
  }, [initQuantity]);

  if (!quantity) {
    return <StepperEntryButton onClick={handleStepperEntryButtonClick} />;
  }

  return (
    <Stepper
      step={quantity}
      setStep={setQuantity}
      stepUnit={STEP_UNIT}
      minStep={PRODUCT_COUNT.MIN}
      maxStep={PRODUCT_COUNT.MAX}
      handleIncreaseStep={updateCartItemQuantity}
      handleDecreaseStep={deleteCartItem}
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      buttonWidth={buttonWidth}
      buttonHeight={buttonHeight}
    />
  );
};

export default ProductStepper;
