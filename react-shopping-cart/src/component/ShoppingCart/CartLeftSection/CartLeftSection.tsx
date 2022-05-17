import { useDispatch, useSelector } from "react-redux";

import AllSelectButton from "component/ShoppingCart/AllSelectButton/AllSelectButton";
import ProductDeleteButton from "component/ShoppingCart/ProductDeleteButton/ProductDeleteButton";
import ShoppingCartItemsContainer from "component/ShoppingCart/ShoppingCartItemsContainer/ShoppingCartItemsContainer";
import WithSpinner from "component/Wrapper/WithSpinner/WithSpinner";

import { ColumnFlexWrapper } from "styles/Wrapper";
import {
  selectCartsLoading,
  selectCurrentCarts,
} from "redux/carts/carts.selector";
import { deleteCheckedProductsStart } from "redux/carts/carts.action";
import { CURRENT_USER } from "constants";
import {
  CartItemsContainerHeader,
  CartLeftSectionHeader,
} from "./CartLeftSection.style";

function CartLeftSection() {
  const carts = useSelector(selectCurrentCarts);
  const dispatch = useDispatch();
  const myCarts = carts.filter((cart) => cart.user === CURRENT_USER);
  const cartLoading = useSelector(selectCartsLoading);
  const checkedIdList = myCarts
    .filter((cart) => cart["checked"])
    .map((cart) => cart.id);

  const handleDeleteButtonClick = () => {
    dispatch(deleteCheckedProductsStart(checkedIdList));
  };

  return (
    <ColumnFlexWrapper width="490px">
      <CartLeftSectionHeader>
        <AllSelectButton />
        <ProductDeleteButton onClick={handleDeleteButtonClick}>
          상품삭제
        </ProductDeleteButton>
      </CartLeftSectionHeader>
      <div style={{ width: "inherit" }}>
        <CartItemsContainerHeader>{`든든배송상품 ${myCarts.length}개`}</CartItemsContainerHeader>
        <WithSpinner loading={cartLoading}>
          <ShoppingCartItemsContainer carts={myCarts} />
        </WithSpinner>
      </div>
    </ColumnFlexWrapper>
  );
}

export default CartLeftSection;
