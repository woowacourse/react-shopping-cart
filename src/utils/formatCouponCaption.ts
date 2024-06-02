import formatKoreanCurrency from './formatKoreanCurrency';

const formatCouponCaption = {
  formatCouponExpirationDate: (expirationDate: string) => {
    const formattedDate = expirationDate.split('-');
    return `만료일:${formattedDate[0]}년 ${formattedDate[1]}월 ${formattedDate[2]}일`;
  },
  formatCouponMinimumAmount: (minimumAmount: number) => {
    return `최소 주문 금액:${formatKoreanCurrency(minimumAmount)}`;
  },
  formatCouponAvailableTime: (availableTime: { start: string; end: string }) => {
    const formatTime = (time: string) => {
      const hour = time.split(':').map(Number)[0];
      const meridiem = hour >= 12 ? '오후' : '오전';
      return `${meridiem} ${hour}시`;
    };
    return `사용 가능 시간: ${formatTime(availableTime.start)}부터 ${formatTime(
      availableTime.end,
    )}까지`;
  },
};

export default formatCouponCaption;
