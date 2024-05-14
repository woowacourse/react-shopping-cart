import ShoppingCartDescription from '../ShoppingCartDescription/ShoppingCartDescription';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import PaymentTotal from '../PaymentTotal/PaymentTotal';
import * as S from './styled';

const ShoppingCartOverview = () => {
  const priceInfo = {
    order: 70000,
    shipping: 3000,
    total: 73000,
  };

  return (
    <S.Container>
      <ShoppingCartDescription kindCount={2} />
      <ShoppingCartList />
      <PaymentTotal priceInfo={priceInfo} />
    </S.Container>
  );
};

export default ShoppingCartOverview;
