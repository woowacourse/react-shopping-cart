import * as S from './style';

function SkeletonProductItem() {
  return (
    <S.Container aria-label="하나의 판매 품목 정보 로딩 중">
      <S.ProductItemImage />
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label={'판매 품목 이름 로딩 중'} isLoading={true}>
            로딩 중...
          </S.ProductItemName>
          <S.ProductItemPrice aria-label={'판매 품목 가격 로딩 중'} isLoading={true}>
            로딩 중...
          </S.ProductItemPrice>
        </S.ProductItemLayout>
      </S.ProductItemContents>
    </S.Container>
  );
}

export default SkeletonProductItem;
