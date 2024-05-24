import * as S from './style';

import { cartItemsState, isIslandOrMountainState, selectedCouponsState } from '../../recoil/atoms';
import { checkedItemsState, couponAmountState, deliveryFeeState } from '../../recoil/selectors';
import { fetchCartItems, orderItems } from '../../apis';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ENDPOINTS from '../../constants/endpoints';
import FooterButton from '../../components/FooterButton/FooterButton';
import Header from '../../components/Header/Header';
import convertToLocaleAmount from '../../utils/convertToLocalePrice';
import { useEffect } from 'react';

export default function OrderLastPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const checkedItems = useRecoilValue(checkedItemsState);
  const totalCartItemsCount = checkedItems.length;
  const totalProductsCount = checkedItems.reduce((acc, item) => acc + item.quantity, 0);
  const orderAmount = checkedItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const couponAmount = useRecoilValue(couponAmountState);
  const totalAmount = orderAmount + deliveryFee - couponAmount;

  useEffect(() => {
    if (location === null) navigate(ENDPOINTS.shoppingCart);
    if (!location.state) navigate(ENDPOINTS.shoppingCart);
    if (location.state && location.state.lastPage !== ENDPOINTS.orderConfirmation)
      navigate(ENDPOINTS.shoppingCart);
  }, [location, navigate]);

  const setIsIslandOrMountain = useSetRecoilState(isIslandOrMountainState);
  const setCartItems = useSetRecoilState(cartItemsState);
  const setSelectedCoupons = useSetRecoilState(selectedCouponsState);
  const handleClickFooterButton = async () => {
    await orderItems(checkedItems.map((item) => item.id));
    const nextCartItem = await fetchCartItems();
    setCartItems(nextCartItem);
    setIsIslandOrMountain(false);
    navigate(ENDPOINTS.shoppingCart);
    setSelectedCoupons([]);
  };

  return (
    <>
      <Header />

      {location.state && (
        <S.ConfirmPurchaseContainer>
          <S.Title>주문 확인</S.Title>
          <S.Description>
            총 {totalCartItemsCount}종류의 상품 {totalProductsCount}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </S.Description>

          <S.TotalAmount>
            <S.TotalAmountTitle>총 결제 금액</S.TotalAmountTitle>
            {convertToLocaleAmount(totalAmount)}
          </S.TotalAmount>
        </S.ConfirmPurchaseContainer>
      )}

      <FooterButton buttonText="장바구니로 돌아가기" onClick={handleClickFooterButton} />
    </>
  );
}
