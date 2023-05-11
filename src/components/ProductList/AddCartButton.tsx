import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import { ADD_CART_BUTTON } from '@constants/testId';
import { BUCKET_BUTTON } from '@assets';

interface AddCartButtonProps {
  addProductToCart: () => void;
  removeProductFromCart: () => void;
}

const AddCartButton = ({
  addProductToCart,
  removeProductFromCart,
}: AddCartButtonProps) => {
  const [flag, setFlag] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const toggleCounter = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (flag) {
      setFlag(false);
      return;
    }

    if (!isClicked) {
      removeProductFromCart();
      return;
    }

    addProductToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked, flag]);

  return (
    <Wrapper>
      {!isClicked && (
        <Button
          type="button"
          onClick={toggleCounter}
          data-testid={ADD_CART_BUTTON}
        >
          <Image src={BUCKET_BUTTON} alt="장바구니 버튼" />
        </Button>
      )}
      {isClicked && (
        <BucketCounter
          removeProductFromCart={removeProductFromCart}
          setIsClicked={setIsClicked}
        />
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
