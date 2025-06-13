import { useOrderContext } from "../../contexts/OrderContext";
import Text from "../../../../shared/components/common/Text";
import ItemCard from "../../../../shared/components/ItemCard";
import * as S from "./OrderItemList.styled";

const OrderItemList = () => {
  const { cartItems: orderItems } = useOrderContext();

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
