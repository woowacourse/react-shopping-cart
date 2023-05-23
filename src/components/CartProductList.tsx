import { styled } from 'styled-components';
import { StyledText } from './common/Text';
import { CheckBox } from './common/CheckBox';
import { Button as SelectedDeleteButton } from './common/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cartCountState,
  cartState,
  checkedProductState,
} from '../atoms/CartState';
import { CartProductItem } from './CartProductItem';
import { useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { Cart } from '../types';
import Loading from './Loading';
import { Image as EmptyCartImage } from './common/Image';

export const CartProductList = () => {
  const { getAPI, isLoading } = useFetch<{ cartList: Cart[] }>();
  const cartProductCount = useRecoilValue(cartCountState);
  const cartList = useRecoilValue(cartState);
  const [isChecked, setIsChecked] = useState(true);
  const [checkedItem, setCheckedItem] = useRecoilState(checkedProductState);

  useEffect(() => {
    getAPI('/cart-items');
    setCheckedItem(cartList);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCheckedItem(isChecked ? [] : cartList);
  };

  return (
    <CartProductListContainer>
      <ProductCountTextWrapper>
        <ProductCountText size="20px">
          든든배송 상품 {`(${cartProductCount}개)`}
        </ProductCountText>
      </ProductCountTextWrapper>
      <ProductItemContainer>
        {cartList.length === 0 && (
          <EmptyCartWrapper>
            <EmptyCartImage
              width="340px"
              height="340px"
              source="/assets/empty_cart_image.jpg"
              alternative="장바구니가 비었습니다."
            />
            <EmptyCartMessage>장바구니가 비었습니다.</EmptyCartMessage>
          </EmptyCartWrapper>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          cartList.map((item) => (
            <CartProductItem key={item.id} cartProduct={item} />
          ))
        )}
      </ProductItemContainer>
      <BottomSideWrapper>
        <CheckBox isChecked={isChecked} onChange={handleCheckboxChange} />
        <SelectedProductText>
          전체선택 ({checkedItem.length}/{cartList.length})
        </SelectedProductText>
        <SelectedDeleteButton
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

const EmptyCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
`;

const EmptyCartMessage = styled.div`
  padding: 50px 0;
  text-align: center;
`;
