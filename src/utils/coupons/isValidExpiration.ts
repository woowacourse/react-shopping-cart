import { splitByDelimiter } from "../splitByDelimiter";

export const isValidExpiration = (expiration: string): boolean => {
  const [year, month, date] = splitByDelimiter(expiration, "-").map(Number);

  const today = new Date();
  const expirationDate = new Date(year, month - 1, date);

  return (
    expirationDate >=
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
};
