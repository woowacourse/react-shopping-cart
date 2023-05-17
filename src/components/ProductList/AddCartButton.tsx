import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import BucketCounter from '@components/common/BucketCounter';
import { BUCKET_BUTTON } from '@assets/images';

interface AddCartButtonProps {
  id: number;
  addProductToCart: () => void;
}

const AddCartButton = ({ id, addProductToCart }: AddCartButtonProps) => {
  const cart = useRecoilValue(cartAtom);
  const savedCartData = cart.find((item) => item.id === id);

  return (
    <Wrapper>
      {savedCartData ? (
        <BucketCounter id={id} quantity={savedCartData.quantity} />
      ) : (
        <Button
          title="장바구니 추가"
          type="button"
          onClick={addProductToCart}
          aria-label="장바구니 버튼"
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
