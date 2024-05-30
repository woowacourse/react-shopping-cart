export const COUPON_ORDER_LIMIT = 2;

export const COUPON_ORDER_MESSAGE = {
    choiceCoupon: "쿠폰을 선택해 주세요",
    askOrderConfirm: `최종 결제 금액을 확인해 주세요.`,
    askMoveToCartPage: `모든 주문 정보가 새로고침 됩니다. 장바구니 페이지로 이동하시겠습니까?`,
    couponLimit: `쿠폰은 최대 ${COUPON_ORDER_LIMIT}개까지 사용할 수 있습니다.`,
};

export const couponApplyText = (totalDiscountAmount: number, isFreeShipping: boolean) => {
    const couponApplyTextArr = []
    if (totalDiscountAmount) {
        couponApplyTextArr.push(`총${totalDiscountAmount} 원 할인 쿠폰 사용하기`);
    } else if (!isFreeShipping) {
        couponApplyTextArr.push(`적용한 쿠폰이 없습니다.`);
    }
    if (isFreeShipping) {
        couponApplyTextArr.push(`무료 배송`);
    }
    return couponApplyTextArr.join(" + ");
}
