import PriceSectionSkeleton from "@/components/PriceSection/PriceSection.skeleton";
import * as S from "./CartPage.style";
import SkeletonProductList from "@/components/ProductList/ProductList.skeleton";
import SkTitleSet from "@/components/_common/TitleSet/TitleSet.skeleton";

const CartPageSkeleton = () => {
  return (
    <S.CartPageLayout>
      <SkTitleSet />
      <S.SkCheckBoxWrapper />
      <S.CheckBoxWrapper>
        <S.SkCheckBoxWrapper />
      </S.CheckBoxWrapper>
      <SkeletonProductList />
      <PriceSectionSkeleton />
    </S.CartPageLayout>
  );
};

export default CartPageSkeleton;
