import PriceSectionSkeleton from "@/components/PriceSection/PriceSection.skeleton";
import * as S from "./CartPage.style";
import SkeletonProductList from "@/components/ProductList/ProductList.skeleton";
import SkTitleSet from "@/components/_common/TitleSet/TitleSet.skeleton";

const CartPageSkeleton = () => {
  return (
    <S.CartPageWrapper>
      <SkTitleSet />
      <S.SkCheckBoxWrapper />
      <S.CheckBoxWrapper>
        <S.SkCheckBoxWrapper />
      </S.CheckBoxWrapper>
      <SkeletonProductList />
      <PriceSectionSkeleton />
    </S.CartPageWrapper>
  );
};

export default CartPageSkeleton;
