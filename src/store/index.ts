import { atom } from "recoil";
import mockData from "../mockData.json";

export const itemsState = atom({
  key: "items",
  default: structuredClone(mockData),
});
