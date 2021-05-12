const formatPrice = price => new Intl.NumberFormat('ko-KR').format(price);

export default formatPrice;
