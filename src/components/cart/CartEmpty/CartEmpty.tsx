import * as S from "./CartEmpty.style.ts";
import TitleSet from "../../_common/TitleSet/TitleSet.tsx";
import {CART_PAGE_TITLES} from "@/constants/cart.ts";
import TextBox from "../../_common/TextBox/TextBox.tsx";

const CartEmpty = () => {
    return (
        <>
            <TitleSet title={CART_PAGE_TITLES.cart}/>
            <S.Wrapper>
                <TextBox type="caption" text="장바구니에 담은 상품이 없습니다."/>
            </S.Wrapper>
        </>
    );
};

export default CartEmpty;
