import {
  setSelectedInfoAllDeSelect,
  setSelectedInfoAllSelect,
} from "../../domains/selectedInfo";
import useCartManager from "../../hooks/useCartManager";
import useSelectAction from "../../hooks/useSelectAction";
import { useSelectContext } from "../../stores/SelectContext";
import CartItem from "../CartItem/CartItem";
import CheckBox from "../CheckBox/CheckBox";
import * as S from "./CartList.styled";

function CartList() {
  const { selectedState, isAllSelected } = useSelectContext();
  const { selectAll, deselectAll } = useSelectAction();
  const { cartData, isLoading } = useCartManager();

  if (isLoading || !cartData) {
    return <S.LoadingContent>장바구니를 불러오는 중입니다...</S.LoadingContent>;
  }

  const handlerSelectAll = () => {
    if (isAllSelected) {
      deselectAll();
      setSelectedInfoAllDeSelect(selectedState);
    } else {
      selectAll();
      setSelectedInfoAllSelect(selectedState);
    }
  };

  return (
    <>
      <S.Description>
        현재 {cartData.length}종류의 상품이 담겨있습니다.
      </S.Description>
      <CheckBox
        text={"전체선택"}
        isChecked={isAllSelected}
        onChange={handlerSelectAll}
      />
      <S.CartItemList>
        {cartData.map((cart) => (
          <CartItem key={cart.product.id} cart={cart} type="cart" />
        ))}
      </S.CartItemList>
    </>
  );
}

export default CartList;
