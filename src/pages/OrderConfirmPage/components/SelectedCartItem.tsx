import { useRecoilValue } from "recoil";
import { cartItemQuantity } from "@/recoil/cartItemQuantity";

import Caption from "@/components/_common/Caption/Caption";
import Item from "@/components/Item/Item";

import { CartItem } from "@/types/cart";

interface SelectedCartItemProps {
  item: CartItem;
}

const SelectedCartItem = ({
  item: {
    id,
    product: { name, imageUrl, price },
  },
}: SelectedCartItemProps) => {
  const itemQuantity = useRecoilValue(cartItemQuantity(id));

  return (
    <Item>
      <Item.ItemBody>
        <Item.ItemImage path={imageUrl} />
        <Item.ItemDetail>
          <Item.ItemPriceTag itemName={name} price={price} />
          <Caption text={`${itemQuantity}개`} />
        </Item.ItemDetail>
      </Item.ItemBody>
    </Item>
  );
};

export default SelectedCartItem;
