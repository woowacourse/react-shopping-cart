import { UseCartReturnType } from "../../../pages/cart/hooks/useCart";
import Text from "../../common/Text";
import ItemCard from "../../ItemCard";
import * as S from "./OrderItemList.styled";

const OrderItemList = ({ orderItems }: { orderItems: UseCartReturnType["orderConfirmPageData"]["orderItems"] }) => {
  return (
    <S.List>
      {orderItems.map((item) => {
        const { id, quantity, product } = item;
        return (
          <ItemCard gap={12} key={id}>
            <ItemCard.Content gap={24}>
              <ItemCard.Image src={product.imageUrl} alt={product.name} />
              <ItemCard.Information gap={24}>
                <ItemCard.Information gap={4}>
                  <ItemCard.Title text={product.name} />
                  <ItemCard.Price price={product.price} />
                </ItemCard.Information>
                <Text variant="body-3">{quantity}개</Text>
              </ItemCard.Information>
            </ItemCard.Content>
          </ItemCard>
        );
      })}
    </S.List>
  );
};
export default OrderItemList;
