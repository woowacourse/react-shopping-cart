import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import { TEST_ADD_CART_BUTTON } from '@constants/testId';
import { BUCKET_BUTTON } from '@assets';

interface AddCartButtonProps {
  quantity?: number;
  addProductToCart: () => void;
  removeProductFromCart: () => void;
}

const AddCartButton = ({
  quantity,
  addProductToCart,
  removeProductFromCart,
}: AddCartButtonProps) => {
  return (
    <Wrapper>
      {quantity ? (
        <BucketCounter removeProductFromCart={removeProductFromCart} />
      ) : (
        <Button
          type="button"
          onClick={addProductToCart}
          data-testid={TEST_ADD_CART_BUTTON}
        >
          <Image src={BUCKET_BUTTON} alt="장바구니 버튼" />
        </Button>
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
