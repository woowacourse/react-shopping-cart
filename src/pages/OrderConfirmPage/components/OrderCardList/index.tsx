import * as S from "./OrderCardList.styled";
import CartCard from "../../../../components/CartCard";
import Text from "../../../../components/common/Text";
import { CartItemContent } from "../../../../types/cartItem";

const OrderCardList = ({ orderItems }: { orderItems: CartItemContent[] }) => {
  return (
    <S.Container>
      <S.List>
        {orderItems.map((item) => {
          const { id, product } = item;
          return (
            <CartCard gap={12} key={id}>
              <CartCard.Content gap={24} verticalPosition="start">
                <CartCard.Image src={product.imageUrl} alt={product.name} />
                <CartCard.Information gap={24}>
                  <CartCard.Information gap={4}>
                    <CartCard.Title text={product.name} />
                    <CartCard.Price price={product.price} />
                  </CartCard.Information>
                  <Text variant="body-3">{item.quantity}개</Text>
                </CartCard.Information>
              </CartCard.Content>
            </CartCard>
          );
        })}
      </S.List>
    </S.Container>
  );
};

export default OrderCardList;
