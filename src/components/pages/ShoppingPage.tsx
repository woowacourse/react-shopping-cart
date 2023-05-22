import PageTemplate from '../templates/PageTemplate';
import ProductList from '../list/ProductList/ProductList';

const ShoppingPage = () => {
  return (
    <PageTemplate
      title="장바구니 미션 - 쇼핑페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 쇼핑페이지입니다."
    >
      <ProductList />
    </PageTemplate>
  );
};

export default ShoppingPage;
