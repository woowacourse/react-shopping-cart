import { useState } from 'react';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import { TEST_ADD_CART_BUTTON } from '@constants/testId';
import { BUCKET_BUTTON } from '@assets';

interface AddCartButtonProps {
  addProductToCart: () => void;
  removeProductFromCart: () => void;
}

const AddCartButton = ({
  addProductToCart,
  removeProductFromCart,
}: AddCartButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const addCartAndShowBucketCounter = () => {
    setIsClicked(true);
    addProductToCart();
  };

  const removeCartAndHideBucketCounter = () => {
    setIsClicked(false);
    removeProductFromCart();
  };

  return (
    <Wrapper>
      {!isClicked && (
        <Button
          type="button"
          onClick={addCartAndShowBucketCounter}
          data-testid={TEST_ADD_CART_BUTTON}
        >
          <Image src={BUCKET_BUTTON} alt="장바구니 버튼" />
        </Button>
      )}
      {isClicked && (
        <BucketCounter removeProductFromCart={removeCartAndHideBucketCounter} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Button = styled.button`
  border: none;

  background: none;
  cursor: pointer;
`;

const Image = styled.img`
  width: 25px;
  height: 22px;
`;

export default AddCartButton;
