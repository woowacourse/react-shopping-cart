import Checkbox from "../Checkbox";
import NumberInputButton from "../NumberInputButton";
import * as S from "./index.styles";
import { getProductById } from "../../api";
import { useCallback, useEffect, useState } from "react";
import { product } from "../../types/product";

interface CartItemPros {
  id: number;
}

const CartItem = ({ id }: CartItemPros) => {
  const [data, setData] = useState({} as product);

  const fetchData = useCallback(
    async function () {
      const data = (await getProductById(id)) as product;
      setData(data);
    },
    [id]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (!Object.keys(data)) {
    return <div></div>;
  }
  return (
    <S.CartItemContainer>
      <S.ItemContainer>
        <Checkbox id={id} />
        <S.ItemImage src={data.imgUrl} alt={"안녕"} />
        <span>{data.title}</span>
      </S.ItemContainer>
      <S.ItemRightContainer>
        <S.CartButton>🗑</S.CartButton>
        <NumberInputButton />
        <p>{data.price.toLocaleString("ko-kr")}원</p>
      </S.ItemRightContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
