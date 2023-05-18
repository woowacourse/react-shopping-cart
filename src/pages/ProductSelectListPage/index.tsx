import PageTitle from '@Components/PageTitle';

import EstimatedAmountPart from './EstimatedAmountPart';
import ProductSelectListPart from './ProductSelectListPart';
import * as S from './style';

const list = [
  {
    id: 1,
    name: '[간편식] 불고기 도시락',
    price: 10000,
    imageUrl:
      'https://images.unsplash.com/photo-1616645258469-ec681c17f3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 2,
    name: '[밀키트] 을왕리 부대찌개',
    price: 12000,
    imageUrl:
      'https://images.unsplash.com/photo-1584509171119-9054d2d7d9a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
  },
  {
    id: 3,
    name: '[밀키트] 바질 베이스로 만든 에그인헬',
    price: 8000,
    imageUrl:
      'https://images.unsplash.com/photo-1489391013510-49401c8a3b6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
];

function ProductSelectListPage() {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <S.Main>
        <ProductSelectListPart list={list} />
        <EstimatedAmountPart />
      </S.Main>
    </>
  );
}

export default ProductSelectListPage;
