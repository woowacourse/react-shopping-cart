import createTodayTime from "./createTodayTime";

const validation = {
  expirationDate: (date: string) => {
    const now = new Date();
    const expirationDate = new Date(date);
    return now <= expirationDate;
  },
  minimumAmount: (amount: number, minimumAmount: number | null) => {
    if (!minimumAmount) return true;
    return amount >= minimumAmount;
  },
  buyQuantity: (itemQuantity: number, buyQuantity: number | null, getQuantity: number | null) => {
    if (!buyQuantity || !getQuantity) return true;
    return itemQuantity >= buyQuantity + getQuantity;
  },
  availableTime: (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return true;

    const now = new Date();
    const start = createTodayTime(startTime);
    const end = createTodayTime(endTime);
    return now >= start && now <= end;
  },
};

export default validation;
