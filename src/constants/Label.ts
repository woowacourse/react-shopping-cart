export const LABEL = {
  allSelect: '전체 선택',
  remoteArea: '제주도 및 도서 산간 지역',
  remoteAreaTitle: '배송 정보',
  orderTitle: '주문 확인',
};

export const LABEL_WITH_PROPS = {
  orderSubTitle: (itemTypeQuantity: number, totalQuantity: number) => {
    return `총 ${itemTypeQuantity}종류의 상품 ${totalQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`;
  },
};
