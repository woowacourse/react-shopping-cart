import { Product } from "hooks/useGet";

export interface ProductType extends Product {
  quantity: number;
  isChecked: boolean;
}
