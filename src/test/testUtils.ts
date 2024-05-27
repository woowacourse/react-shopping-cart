import { cartItemDummy } from "@/mock/testMockData";

type ProductListType = {
  product: { id: number; price: number };
  quantity: number;
};

export const makeCartStateDummy = (productList: ProductListType[]) => {
  return productList.map(({ product, quantity }, index) => ({
    ...cartItemDummy,
    id: index,
    product: { ...cartItemDummy.product, ...product },
    quantity,
  }));
};
