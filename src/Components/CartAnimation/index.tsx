import React, { VFC } from "react";

import { Animation } from "..";
import { Contents } from "./style";

const CartAnimation: VFC = () => <Animation Contents={<Contents />} title="장바구니에 상품을 담았습니다." />;

export default CartAnimation;
