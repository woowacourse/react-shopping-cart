import { CartItem } from "../types/Cart";
import { Product, Id } from "../types/Product";
import mockData from "./mockData.json";

export class Datas {
  products: Product[];
  cartList: CartItem[];

  constructor() {
    this.products = [...mockData];
    this.cartList = JSON.parse(localStorage.getItem("cart") ?? "[]");
  }

  pushItemAtCart(id: Id) {
    if (this.cartList.findIndex((item) => item.id === id) !== -1) return;

    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return;

    this.cartList.push({ id, quantity: 1, product: this.products[productIndex] });
    localStorage.setItem("cart", JSON.stringify(this.cartList));
  }

  patchCartItemQuantity(id: Id, quantity: number) {
    const index = this.cartList.findIndex((item) => item.id === id);
    if (index === -1) return;

    this.cartList[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(this.cartList));
  }

  deleteItemFromCart(id: Id) {
    this.cartList = this.cartList.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(this.cartList));
  }
}
