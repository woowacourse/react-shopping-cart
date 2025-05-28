import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ShoppingCartSection from '../../components/ShoppingCartSection/ShoppingCartSection';
import * as S from './ShoppingCartPage.styles';
import { getCartItem } from '../../apis/cartItem';

function onClick() {
  alert('결제하기 버튼이 클릭되었습니다.');
}

export default function ShoppingCartPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCartItem({ sortBy: 'asc' }).then((response) => {
      setData(response);
    });
  }, []);

  return (
    <>
      <Header title="SHOP" />
      <ShoppingCartSection items={data} />
      <S.ButtonWrapper>
        <Button onClick={onClick}>주문 확인</Button>
      </S.ButtonWrapper>
    </>
  );
}
