import * as S from "./ProductItem.style";
import * as Sk from "./ProductItem.skeleton.style";

const ProductItemSkeleton = () => {
  return (
    <S.ItemWrapper>
      <S.ItemButtonWrapper>
        <Sk.ButtonSection />
      </S.ItemButtonWrapper>

      <S.ItemInfoBox>
        <Sk.ItemImgBox />

        <S.ItemInfoTextBox>
          <S.FlexBox>
            <Sk.TextSection />
            <Sk.TextSection />
          </S.FlexBox>

          <Sk.UpdateButtonWrapper></Sk.UpdateButtonWrapper>
        </S.ItemInfoTextBox>
      </S.ItemInfoBox>
    </S.ItemWrapper>
  );
};

export default ProductItemSkeleton;
