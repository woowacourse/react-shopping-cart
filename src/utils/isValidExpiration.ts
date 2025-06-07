export const isValidExpiration = (expiration: string): boolean => {
  const [year, month, date] = expiration.split("-").map(Number);

  const today = new Date();
  const expirationDate = new Date(year, month, date);

  return (
    expirationDate >=
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
};
