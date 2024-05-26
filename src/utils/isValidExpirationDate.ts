import { curKoreaTime } from "./date";

export const isValidExpirationDate = (expirationDate: string) => {
  const today = curKoreaTime;
  const expiration = new Date(expirationDate);
  return today <= expiration;
};
