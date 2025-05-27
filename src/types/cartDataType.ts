import { ProductDTOType } from "./productDTOType";

export type CartDataType = {
  id: number;
  quantity: number;
  product: ProductDTOType;
};
