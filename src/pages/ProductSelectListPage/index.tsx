import PageTitle from '@Components/PageTitle';

import EstimatedAmountPart from '@Pages/ProductSelectListPage/EstimatedAmountPart';
import ProductSelectListPart from '@Pages/ProductSelectListPage/ProductSelectListPart';

import useCheckedItems from '@Hooks/useCheckedItems';

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
