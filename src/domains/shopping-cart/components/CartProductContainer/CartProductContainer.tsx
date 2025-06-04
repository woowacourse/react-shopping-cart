import { deleteShoppingCart } from "../../api/shoppingCart";
import { CartItemTypes } from "../../types/cartItem";
import Button from "../../../../components/Button/Button";
import { CartProduct } from "../CartProduct/CartProduct";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { Line } from "../../../../components/Line/Line";
import {
  CartItemBox,
  CartItemHeader,
  CartProductContainerLayout,
  CartProductList,
  SelectAllLayout,
} from "./CartProductContainer.style";

interface CartProductContainerProps {
  cartItem: CartItemTypes[];
  onChange: () => void;
  onError: (message: string) => void;
  selectedCartIds: string[];
  setSelectedCartIds: (id: string[]) => void;
}

export default function CartProductContainer({
  cartItem,
  onChange,
  onError,
  selectedCartIds,
  setSelectedCartIds,
}: CartProductContainerProps) {
  const handleCheckBox = (id: string) => {
    if (id === "select-all") {
      if (selectedCartIds.length === 0) {
        setSelectedCartIds(cartItem.map((item) => item.id.toString()));
      } else setSelectedCartIds([]);
      return;
    }
    if (selectedCartIds.includes(id)) {
      setSelectedCartIds(selectedCartIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedCartIds([...selectedCartIds, id]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteShoppingCart(id);
      onChange();
    } catch (error) {
      onError("삭제에 실패했습니다");
    }
  };

  return (
    <>
      <div css={CartProductContainerLayout}>
        <div css={SelectAllLayout}>
          <CheckBox
            isChecked={
              selectedCartIds.length === cartItem.length &&
              cartItem.length !== 0
            }
            dataTestId="select-all"
            id="select-all"
            onChange={handleCheckBox}
          />
          <label htmlFor="select-all">전체 선택</label>
        </div>
        <section css={CartProductList}>
          {cartItem.map((item) => {
            return (
              <div css={CartItemBox}>
                <Line />
                <div css={CartItemHeader}>
                  <CheckBox
                    dataTestId={`select-${item.id}`}
                    isChecked={selectedCartIds.includes(item.id.toString())}
                    onChange={handleCheckBox}
                    id={item.id.toString()}
                  />
                  <Button onClick={() => handleDelete(item.id)} style="ghost">
                    삭제
                  </Button>
                </div>
                <CartProduct
                  key={item.id}
                  id={item.id}
                  imageUrl={item.product.imageUrl}
                  name={item.product.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  onChange={onChange}
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
