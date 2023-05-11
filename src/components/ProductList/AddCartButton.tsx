import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
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
  }, [isClicked]);

  return (
    <Wrapper>
      {!isClicked && (
        <Button type="button" onClick={toggleCounter}>
          <Image src={BUCKET_BUTTON} alt="장바구니 버튼" />
        </Button>
      )}
      {isClicked && <BucketCounter setIsClicked={setIsClicked} />}
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
