export const formatPrice = (price: number): string => {
  return price.toLocaleString("ko-KR");
};

export const formatPriceWithUnit = (price: number): string => {
  return `${formatPrice(price)}원`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("ko-KR");
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatTime = (timeString: string): string => {
  const [hours] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour < 12 ? "오전" : "오후";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${ampm} ${displayHour}시`;
};
