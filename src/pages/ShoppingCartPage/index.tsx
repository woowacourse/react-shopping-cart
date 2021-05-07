import Template from '../../components/shared/Template';
import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartResult from '../../components/ShoppingCart/ShoppingCartResult';
import ShoppingCartInnerContainer from '../../components/ShoppingCart/ShoppingCartInnerContainer';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';

const TITLE = '장바구니';

const ShoppingCartPage = () => {
  return (
    <Template title={TITLE} innerWidth={INNER_TEMPLATE_WIDTH}>
      <ShoppingCartInnerContainer>
        <ShoppingCartSectionList />
        <ShoppingCartResult />
      </ShoppingCartInnerContainer>
    </Template>
  );
};

export default ShoppingCartPage;
