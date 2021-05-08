import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartInnerContainer from '../../components/ShoppingCart/ShoppingCartInnerContainer';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';

const TITLE = '장바구니';

const ShoppingCartPage = () => {
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
