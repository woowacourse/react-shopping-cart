export type ERROR_STATUS = keyof typeof ErrorMessage;

export const ErrorMessage = {
    /*cart*/
    failGetCartList:
        "장바구니 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요.",
    failPatchItemQuantity:
        "상품 수량 변경에 실패했습니다. 나중에 다시 시도해 주세요",
    failDeleteItem: "아이템을 삭제할 수 없습니다. 나중에 다시 시도해 주세요.",
    /*coupons*/
    failGetCoupons:
        "쿠폰 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요.",
    /*order*/
    failPostOrder:
        "주문을 보내는 데 실패했습니다. 나중에 다시 시도해 주세요.",
};
