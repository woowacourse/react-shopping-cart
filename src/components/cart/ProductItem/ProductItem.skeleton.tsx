import * as S from "./ProductItem.style.ts";
import * as Sk from "./ProductItem.skeleton.style.ts";

const ProductItemSkeleton = () => {
  return (
    <S.ItemWrapper type="edit">
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
