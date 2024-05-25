import {useRecoilRefresher_UNSTABLE, useRecoilValue, useResetRecoilState} from "recoil";
import {totalItemOrderCountSelector} from "@/recoil/orderInformation";

import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TitleSet from "@/components/_common/TitleSet/TitleSet";

import PriceSection from "@/components/cart/PriceSection/PriceSection";

import * as S from "./CartPage.style";
import {CART_PAGE_MESSAGES,} from "@/constants/cart";
import ProductList from "@/components/cart/ProductList/ProductList";
import useCartItemsSelectAll from "@/hooks/cart/useCartItemsSelectAll";
import {cartItemSelector, cartItemsState} from "@/recoil/cartItems";
import CartEmpty from "@/components/cart/CartEmpty/CartEmpty";
import Button from "@/components/_common/Button/Button";
import {useNavigate} from "react-router-dom";
import {PAGE_URL} from "@/constants/url";
import TextBox from "@/components/_common/TextBox/TextBox";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import {couponsState} from "@/recoil/coupons";
import {shippingFeeState} from "@/recoil/shippingFeeType";
import {CAPTION, HEADER_TITLES} from "@/constants/titleAndCaption.ts";
import {SHIPPING_MESSSAGES} from "@/constants/shippingInfo.ts";

const CartPage = () => {
    const {isAllItemSelected, selectAllItem, unselectAllItem} =
        useCartItemsSelectAll();
    const selectedItems = useRecoilValue(totalItemOrderCountSelector);
    const cartItemList = useRecoilValue(cartItemsState);
    const navigate = useNavigate();

    const resetCoupons = useResetRecoilState(couponsState);
    const resetShippingFee = useResetRecoilState(shippingFeeState);
    const refreshCartItems = useRecoilRefresher_UNSTABLE(cartItemSelector);

    const onMoveOrderConfirmPage = () => {
        navigate(PAGE_URL.orderConfirm);
    };
    //
    // useEffect(() => {
    //     refreshCartItems()
    //     resetCoupons();
    //     resetShippingFee();
    // }, []);

    return (
        <>
            <S.CartItemListWrapper>
                {cartItemList.length ? (
                    <>
                        <TitleSet
                            title={HEADER_TITLES.cart}
                            subTitle={CART_PAGE_MESSAGES.itemCount(cartItemList.length)}
                        />
                        <S.CheckBoxWrapper>
                            <CheckBox
                                isChecked={isAllItemSelected}
                                onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
                            />
                            <TextBox
                                type="xSmall"
                                text={CAPTION.allItemSelected}
                            />
                        </S.CheckBoxWrapper>
                        <ProductList productList={cartItemList}/>
                        <MoreInfo text={SHIPPING_MESSSAGES.freeShippingInfo}/>
                        <PriceSection isApplyCoupon={false}/>
                    </>
                ) : (
                    <>
                        <CartEmpty/>
                    </>
                )}
            </S.CartItemListWrapper>
            <Button
                size="large"
                position="bottom"
                width="full"
                theme="dark"
                disabled={!selectedItems}
                onClick={onMoveOrderConfirmPage}
            >
                {CAPTION.orderConfirm}
            </Button>
        </>
    );
};

export default CartPage;
