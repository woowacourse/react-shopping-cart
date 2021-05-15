import React, { VFC } from "react";

import Animation from "../@shared";
import { CartAnimation } from "./style";

const Cart: VFC = () => <Animation Contents={<CartAnimation />} title="장바구니에 상품을 담았습니다." />;

export default Cart;
