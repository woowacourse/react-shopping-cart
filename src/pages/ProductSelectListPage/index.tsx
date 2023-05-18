import PageTitle from '@Components/PageTitle';

import EstimatedAmountPart from './EstimatedAmountPart';
import ProductSelectListPart from './ProductSelectListPart';
import * as S from './style';

function ProductSelectListPage() {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <S.Main>
        <ProductSelectListPart />
        <EstimatedAmountPart />
      </S.Main>
    </>
  );
}

export default ProductSelectListPage;
