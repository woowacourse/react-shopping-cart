import React, { ReactElement, FC } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Button } from "..";
import actions from "../../actions";
import { COLOR } from "../../constants/theme";
import { ProductImageProps } from "../ProductImage";
import { Li, Desc, NameLink, OptionPricePart } from "./style";

interface OrderProductItemProps {
  id: number;
  Image: ReactElement<ProductImageProps>;
  name: string;
  price?: number;
  quantity: number;
}

const OrderProductItem: FC<OrderProductItemProps> = ({ 
    id, 
    Image, 
    name,
    price, 
    quantity 
  }) => {
    const dispatch = useDispatch();

    return (
      <Li>
        <Link to={`/cart?id=${id}`}>{Image}</Link>
        <Desc>
          <NameLink to={`/cart?id=${id}`}>{name}</NameLink>
          <OptionPricePart>
            {price && <span>{price.toLocaleString("ko-KR")} 원 / </span>}
            <span>수량 : {quantity}개</span>
          </OptionPricePart>
        </Desc>
        <Button 
          width="9rem" 
          height="2.3rem" 
          color={COLOR.WHITE} 
          backgroundColor={COLOR.MAIN}
          onClick={() => dispatch(actions.cart.post.request(Number(id)))}
        >
          장바구니
        </Button>
      </Li>
    );
  }

export default OrderProductItem;
export { OrderProductItemProps };
