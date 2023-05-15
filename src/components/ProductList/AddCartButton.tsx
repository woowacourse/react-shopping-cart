import { useCallback, useState } from 'react';
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
  const [isClicked, setIsClicked] = useState(false);

  const momoizedSetIsClicked = useCallback(
    (value: boolean) => {
      setIsClicked(value);
    },
    [setIsClicked]
  );

  const addCartAndChangeImage = () => {
    momoizedSetIsClicked(true);

    addProductToCart();
  };

  return (
    <AddCartButtonWrapper>
      {isClicked ? (
        <BucketCounter
          removeProductFromCart={removeProductFromCart}
          setIsClicked={momoizedSetIsClicked}
        />
      ) : (
        <Button
          type="button"
          onClick={addCartAndChangeImage}
          data-testid={ADD_CART_BUTTON}
        >
          <Image src={BUCKET_BUTTON} alt="장바구니 버튼" />
        </Button>
      )}
    </AddCartButtonWrapper>
  );
};

const AddCartButtonWrapper = styled.div``;

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
