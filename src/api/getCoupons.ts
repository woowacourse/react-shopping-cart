const getCoupons = async () => {
  const data = await fetch('https://localhost:5273/coupons');
  const result = await data.json();

  return result;
};

export default getCoupons;
