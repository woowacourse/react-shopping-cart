import Template from '../../components/shared/Template';
import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartInnerContainer from '../../components/ShoppingCart/ShoppingCartInnerContainer';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';

const TITLE = '장바구니';

const ShoppingCartPage = () => {
  return (
    <Template title={TITLE} innerWidth={INNER_TEMPLATE_WIDTH}>
      <ShoppingCartInnerContainer>
        <ShoppingCartSectionList />
        <ShoppingCartResultSubmitCard />
      </ShoppingCartInnerContainer>
    </Template>
  );
};

export default ShoppingCartPage;
