import PriceSectionSkeleton from "@/components/cart/PriceSection/PriceSection.skeleton";
import * as S from "./CartPage.skeleton.style";
import SkeletonProductList from "@/components/cart/ProductList/ProductList.skeleton";
import SkTitleSet from "@/components/_common/TitleSet/TitleSet.skeleton";

const CartPageSkeleton = () => {
  return (
    <S.CartItemListWrapper>
      <SkTitleSet />
      <S.SkCheckBoxWrapper />
      <S.CheckBoxWrapper>
        <S.SkCheckBoxWrapper />
      </S.CheckBoxWrapper>
      <SkeletonProductList />
      <PriceSectionSkeleton />
    </S.CartItemListWrapper>
  );
};

export default CartPageSkeleton;
