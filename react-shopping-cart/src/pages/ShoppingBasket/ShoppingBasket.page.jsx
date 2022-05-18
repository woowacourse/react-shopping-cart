import { FlexWrapper } from 'components/@shared';
import Header from 'components/Header/Header.component';

function ShoppingBasket() {
  return (
    <>
      <Header />
      <FlexWrapper style={{ margin: '60px 0 60px' }} isColumnDirection={true}>
        <span>여기는 장바구니 페이지</span>
      </FlexWrapper>
    </>
  );
}

export default ShoppingBasket;
