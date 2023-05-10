import { atom } from "recoil";
import mockData from "../mockData.json";
import { ItemType } from "../types/domain";

export const itemsState = atom({
  key: "items",
  default: structuredClone(mockData).map((item: ItemType) => {
    return { ...item, quantity: "0" };
  }),
});
