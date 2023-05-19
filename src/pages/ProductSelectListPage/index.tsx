import PageTitle from '@Components/PageTitle';

import useCheckedItems from '@Hooks/useCheckedItems';

import EstimatedAmountPart from './EstimatedAmountPart';
import ProductSelectListPart from './ProductSelectListPart';
import * as S from './style';

function ProductSelectListPage() {
  const checkController = useCheckedItems();

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <S.Main>
        <ProductSelectListPart checkController={checkController} />
        <EstimatedAmountPart checkedItemsId={checkController.checkedItemsId} />
      </S.Main>
    </>
  );
}

export default ProductSelectListPage;
