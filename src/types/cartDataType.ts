import { ProductDTOType } from "./ProductDTOType";

export type CartDataType = {
  id: number;
  quantity: number;
  product: ProductDTOType;
};
