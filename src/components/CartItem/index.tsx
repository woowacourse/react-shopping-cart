import Checkbox from "../Checkbox";
import NumberInputButton from "../NumberInputButton";
import * as S from "./index.styles";
import useProduct from "../../hooks/useProduct";

interface CartItemPros {
  id: number;
}

const CartItem = ({ id }: CartItemPros) => {
  const { product } = useProduct(id);

  if (!Object.keys(product).length) {
    return <div></div>;
  }
  if (product.isLoading) {
    return <div></div>;
  }
  return (
    <S.CartItemContainer>
      <S.ItemContainer>
        <Checkbox id={id} />
        <S.ItemImage src={product.data?.imgUrl} alt={"안녕"} />
        <span>{product.data?.title}</span>
      </S.ItemContainer>
      <S.ItemRightContainer>
        <S.CartButton>🗑</S.CartButton>
        <NumberInputButton />
        <p>{product.data?.price.toLocaleString("ko-kr")}원</p>
      </S.ItemRightContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
