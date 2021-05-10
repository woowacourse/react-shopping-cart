import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartInnerContainer from '../../components/ShoppingCart/ShoppingCartInnerContainer';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetchCartRedux from '../../hooks/useFetchCartRedux';

const TITLE = '장바구니';

const ShoppingCartPage = () => {
  useFetchCartRedux();

  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <ShoppingCartInnerContainer>
        <ShoppingCartSectionList />
        <ShoppingCartResultSubmitCard />
      </ShoppingCartInnerContainer>
    </ReactShoppingCartTemplate>
  );
};

export default ShoppingCartPage;
