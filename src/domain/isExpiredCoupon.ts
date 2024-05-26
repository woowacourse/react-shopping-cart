export const isExpiredCoupon = (expirationDateStr: string) => {
  const today = new Date();
  const expirationDate = new Date(expirationDateStr);
  return expirationDate < today;
};
