import { deleteShoppingCart } from "../../api/shoppingCart";
import { CartItemTypes } from "../../types/cartItem";
import Button from "../Button/Button";
import { CartProduct } from "../CartProduct/CartProduct";
import { CheckBox } from "../CheckBox/CheckBox";
import { Line } from "../Line/Line";
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
  selectedCartId: string[];
  setSelectedCartId: (id: string[]) => void;
}

export default function CartProductContainer({
  cartItem,
  onChange,
  onError,
  selectedCartId,
  setSelectedCartId,
}: CartProductContainerProps) {
  const handleCheckBox = (id: string) => {
    if (id === "select-all") {
      if (selectedCartId.length === 0) {
        setSelectedCartId(cartItem.map((item) => item.id.toString()));
      } else setSelectedCartId([]);
      return;
    }
    if (selectedCartId.includes(id)) {
      setSelectedCartId(selectedCartId.filter((itemId) => itemId !== id));
    } else {
      setSelectedCartId([...selectedCartId, id]);
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
              selectedCartId.length === cartItem.length && cartItem.length !== 0
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
                    isChecked={selectedCartId.includes(item.id.toString())}
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
