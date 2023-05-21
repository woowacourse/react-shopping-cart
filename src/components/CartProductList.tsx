import { styled } from 'styled-components';
import { StyledText } from './common/Text';
import { CheckBox } from './common/CheckBox';
import { Button as SelectedDeleteButton } from './common/Button';
import { useRecoilValue } from 'recoil';
import { cartCountState } from '../atoms/CartState';
import { CartProductItem } from './CartProductItem';
import { useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { Cart } from '../types';
import Loading from './Loading';

export const CartProductList = () => {
  const { data, getAPI, isLoading } = useFetch<{ cartList: Cart[] }>();
  const cartProductCount = useRecoilValue(cartCountState);

  useEffect(() => {
    getAPI('/cart-items');
  }, []);

  const handleCheckboxChange = () => {
    return;
  };

  return (
    <CartProductListContainer>
      <ProductCountTextWrapper>
        <ProductCountText size="20px">
          든든배송 상품 {`(${cartProductCount}개)`}
        </ProductCountText>
      </ProductCountTextWrapper>
      <ProductItemContainer>
        {data?.cartList.length === 0 && <div>장바구니가 비었습니다.</div>}
        {isLoading ? (
          <Loading />
        ) : (
          data?.cartList.map((item) => (
            <CartProductItem key={item.id} cartProduct={item} />
          ))
        )}
      </ProductItemContainer>
      <BottomSideWrapper>
        <CheckBox onChange={handleCheckboxChange} />
        <SelectedProductText>
          전체선택 (0/{data?.cartList.length})
        </SelectedProductText>
        <SelectedDeleteButton
          onClick={() => {
            return;
          }}
          width="98px"
          height="35px"
          backgroundColor="var(--white-color)"
          borderColor="var(--label-color)"
        >
          선택삭제
        </SelectedDeleteButton>
      </BottomSideWrapper>
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCountText = styled(StyledText)`
  margin: 20px 0;
`;

const ProductCountTextWrapper = styled.div`
  width: 640px;
`;

const ProductItemContainer = styled.div`
  & > :nth-child(1) {
    border-top: 4px solid #aaaaaa;
    border-bottom: 1.5px solid #cccccc;
  }

  & > :not(:first-child) {
    border-bottom: 1.5px solid #cccccc;
  }
`;

const BottomSideWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const SelectedProductText = styled(StyledText)`
  margin: 0 20px;
`;
