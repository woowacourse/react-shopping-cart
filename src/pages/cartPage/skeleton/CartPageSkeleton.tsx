import * as S from "../CartPage.styles";
import * as Skeleton from "./CartPageSkeleton.styles";

const CartPageSkeleton = () => {
  console.log("렌더링됨");
  return (
    <div css={S.cartPageWrapper}>
      <div css={Skeleton.cartTitleSkeleton} />

      <div css={S.cartList}>
        <div css={Skeleton.cartCheckboxSkeleton} />
      </div>

      <div css={S.cartContentContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 스켈레톤UI에선 index를 key로 사용할 수 있음
          <div css={Skeleton.cartContentSkeleton} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CartPageSkeleton;
