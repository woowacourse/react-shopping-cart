import * as S from "./ProductList.style.ts";
import {useRecoilValue} from "recoil";

import ProductItem, {CartItemShowType} from "../ProductItem/ProductItem.tsx";
import {cartItems} from "@/recoil/cartItems.ts";

const ProductList = ({type = "edit"}: { type?: CartItemShowType }) => {
    const cartItemList = useRecoilValue(cartItems);

    return (
        <S.ListWrapper>
            {cartItemList.map((item) => (
                <ProductItem key={item.product.id} item={item} type={type}/>
            ))}
        </S.ListWrapper>
    );
};

export default ProductList;
