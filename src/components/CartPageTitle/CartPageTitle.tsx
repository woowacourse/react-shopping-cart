import { css } from "@emotion/css";
import Text from "../@common/Text/Text";

interface CartPageTitleProps {
  cartItemsTypeCount: number;
}

const CartPageTitle = ({ cartItemsTypeCount }: CartPageTitleProps) => {
  return (
    <div className={CartPageTitleStyle}>
      <Text text="장바구니" type="large" />
      {cartItemsTypeCount > 0 && (
        <Text text={`현재 ${cartItemsTypeCount}개의 상품이 담겨있습니다.`} />
      )}
    </div>
  );
};

export default CartPageTitle;

const CartPageTitleStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
`;
