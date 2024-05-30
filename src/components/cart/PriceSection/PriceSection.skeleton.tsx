import * as S from "./PriceSection.styles.ts";

export const PriceSectionSkeleton = () => {
    return (
        <S.Wrapper>
            <S.SkPriceInfoBox/>
            <S.SkPriceInfoBox/>
            <S.SkPriceInfoBox/>
        </S.Wrapper>
    );
};

export default PriceSectionSkeleton;
