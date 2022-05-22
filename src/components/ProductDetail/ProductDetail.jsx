import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropType from 'prop-types';

import { addProductToCarts, deleteProductFromCarts } from 'store/carts';

import {
  BasicButton,
  BasicDivideLine,
  BasicImage,
  Flex,
} from 'components/shared/basics';

import { COLOR } from 'constants/styles';

import useDeleteProductFromCart from 'hooks/useDeleteProductFromCart';
import useStoreProduct from 'hooks/useStoreProduct';
import usePropInitState from 'hooks/usePropInitState';
import useDebounce from 'hooks/useDebounce';
import useUser from 'hooks/useUser';
import Spinner from 'components/shared/Spinner';

function ProductDetail({ id, src, title, price, isStored }) {
  const dispatch = useDispatch();
  const debounce = useDebounce();

  const { isLoggedIn } = useUser();
  const [isClicked, setIsClicked] = usePropInitState(isStored);
  const { isCartAddLoading, addToCart, cartAddError } = useStoreProduct(id);
  const { isCartDeleteLoading, deleteFromCart, deleteProductFromCartError } =
    useDeleteProductFromCart(id);

  const handleCartButtonClick = () => {
    if (!isLoggedIn) {
      alert('로그인 해주세요.');
      return;
    }

    debounce(() => {
      if (isClicked) {
        deleteFromCart();
        dispatch(deleteProductFromCarts(id));
      } else {
        addToCart();
        dispatch(addProductToCarts(id));
      }

      setIsClicked((prev) => !prev);
    }, 500);
  };

  const isLoading = isCartAddLoading || isCartDeleteLoading;
  const buttonText = isClicked ? '장바구니 취소' : '장바구니 담기';
  const isError = deleteProductFromCartError || cartAddError;

  return (
    <Style.ProductDetailFlexBox direction="column" align="center">
      <Style.ProductDetailImage size="large" src={src} alt={title} />
      <Style.ProductDetailInfo>
        <Style.ProductDetailTitle>{title}</Style.ProductDetailTitle>
        <BasicDivideLine mv="20px" color="#aaaaaa" weight="bold" />
        <Flex justify="space-between">
          <span>금액</span>
          <Style.ProductDetailPrice>{`${price}원`}</Style.ProductDetailPrice>
        </Flex>
      </Style.ProductDetailInfo>
      <Style.ProductDetailCartButton onClick={handleCartButtonClick}>
        {isLoading ? <Spinner /> : buttonText}
        {isError && ' 에러가 발생했습니다.'}
      </Style.ProductDetailCartButton>
    </Style.ProductDetailFlexBox>
  );
}

ProductDetail.propTypes = {
  id: PropType.string.isRequired,
  src: PropType.string.isRequired,
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  isStored: PropType.bool.isRequired,
};

export default ProductDetail;

const Style = {
  ProductDetailFlexBox: styled(Flex)`
    width: 520px;
  `,
  ProductDetailImage: styled(BasicImage)`
    margin-bottom: 10px;
  `,
  ProductDetailInfo: styled.div`
    width: 100%;
  `,
  ProductDetailTitle: styled.span`
    font-size: 24px;
  `,
  ProductDetailPrice: styled.span`
    font-size: 24px;
  `,
  ProductDetailCartButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: 80px;
    background: ${COLOR.PRIMARY};
    border-bottom: 6px solid ${COLOR.DARK_BROWN};
    font-size: 24px;
    color: white;
    border-radius: 4px;

    &:active {
      margin-top: 25px;
      border-bottom-width: 0px;
    }
  `,
};
