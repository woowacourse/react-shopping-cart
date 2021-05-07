import Template from '../../components/shared/Template';
import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ResultSubmitCard from '../../components/shared/ResultSubmitCard';
import ShoppingCartInnerContainer from '../../components/ShoppingCart/ShoppingCartInnerContainer';
import { INNER_TEMPLATE_WIDTH } from '../../constants/style';

const TITLE = '장바구니';

const ShoppingCartPage = () => {
  return (
    <Template title={TITLE} innerWidth={INNER_TEMPLATE_WIDTH}>
      <ShoppingCartInnerContainer>
        <ShoppingCartSectionList />
        <ResultSubmitCard
          title="결제예상금액"
          resultAmount="21,700원"
          resultDescription="결제예상금액"
          buttonText="주문하기(2개)"
        />
      </ShoppingCartInnerContainer>
    </Template>
  );
};

export default ShoppingCartPage;
