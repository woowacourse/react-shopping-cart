import { selector, atom } from "recoil";

const productsState = atom({
  key: "productsState",
  default: [],
});

const fetchProductsSelector = selector({
  key: "fetchProductsSelector",
  get: async () => {
    try {
      const response = await fetch("/products");

      if (!response.ok) {
        throw new Error("오류 발생");
      }

      console.log("pass");
      console.log(response);

      const data = await response.json();
      console.log("success", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export { productsState, fetchProductsSelector };
