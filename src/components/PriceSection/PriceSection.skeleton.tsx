import * as S from "./PriceSection.styles";

export const PriceSectionSkeleton = () => {
  return (
    <S.PriceSection>
      <S.SkPriceInfoBox />
      <S.SkPriceInfoBox />
      <S.SkPriceInfoBox />
    </S.PriceSection>
  );
};

export default PriceSectionSkeleton;
