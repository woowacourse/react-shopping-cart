import { useRecoilState, useSetRecoilState } from "recoil";
import { cartItems } from "@/recoil/cartItems";
import { selectedCartItemIds } from "@/recoil/selectedCardItems";

import useUpdateItemQuantity from "@/hooks/useUpdateItemQuantity";

import { removeCartItem } from "@/apis";

import Item from "../Item/Item";
import Button from "../_common/Button/Button";
import CheckBox from "../_common/CheckBox/CheckBox";

import { CartItem } from "@/types/cart";

interface ProductItemProps {
  item: CartItem;
}

const ProductItem = ({
  item: {
    id,
    product: { name, imageUrl, price },
  },
}: ProductItemProps) => {
  const setCartItemList = useSetRecoilState(cartItems);
  const [isSelected, setIsSelected] = useRecoilState(selectedCartItemIds(id));
  const {
    isUpdateLoading,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useUpdateItemQuantity(id);

  const handleRemoveItem = async () => {
    try {
      await removeCartItem(id);

      setCartItemList((prevCartItems) => {
        return prevCartItems.filter((item) => item.id !== id);
      });
      setIsSelected(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Item>
        <Item.ItemHeader>
          <CheckBox
            isChecked={isSelected}
            onClick={() => setIsSelected((prevSelected) => !prevSelected)}
          />
          <Button
            width="fixed"
            size="small"
            radiusVariant="rounded"
            onClick={handleRemoveItem}
          >
            삭제
          </Button>
        </Item.ItemHeader>
        <Item.ItemBody>
          <Item.ItemImage path={imageUrl} />
          <Item.ItemDetail>
            <Item.ItemPriceTag itemName={name} price={price} />
            <Item.ItemQuantityWithButton
              quantity={quantity}
              isQuantityUpdating={isUpdateLoading}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          </Item.ItemDetail>
        </Item.ItemBody>
      </Item>
    </>
  );
};

export default ProductItem;
