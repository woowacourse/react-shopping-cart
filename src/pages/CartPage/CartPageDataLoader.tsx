import MainLayout from "@/components/layout/MainLayout.tsx";
import {HEADER_TITLES} from "@/constants/titleAndCaption.ts";
import CartPageSkeleton from "@/pages/CartPage/CartPage.skeleton.tsx";
import CartPage from "@/pages/CartPage/CartPage.tsx";
import {useEffect, useState} from "react";
import {useRecoilRefresher_UNSTABLE, useResetRecoilState} from "recoil";
import {couponsState} from "@/recoil/coupons.ts";
import {shippingFeeState} from "@/recoil/shippingFeeType.ts";
import {cartItemSelector} from "@/recoil/cartItems.ts";

const CartPageDataLoader = () => {
    const resetCoupons = useResetRecoilState(couponsState);
    const resetShippingFee = useResetRecoilState(shippingFeeState);
    const refreshCartItems = useRecoilRefresher_UNSTABLE(cartItemSelector);
    const [isLoading, setIsLoading] = useState(true); // 상태를 추가하여 로딩 여부 관리

    useEffect(() => {
        const refreshData = async () => {
            setIsLoading(true); // 데이터 로딩 시작
            await refreshCartItems();
            resetCoupons();
            resetShippingFee();
            setIsLoading(false); // 데이터 로딩 완료
        };

        refreshData();
    }, [refreshCartItems, resetCoupons, resetShippingFee]);

    return (
        <MainLayout>
            <MainLayout.TitleHeader text={HEADER_TITLES.shop}/>
            <MainLayout.Body fallback={<CartPageSkeleton/>}>
                {!isLoading ? <CartPage/> : <CartPageSkeleton/>}
            </MainLayout.Body>
        </MainLayout>
    );
}

export default CartPageDataLoader;