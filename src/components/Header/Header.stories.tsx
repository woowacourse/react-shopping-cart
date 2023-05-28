import type { Meta, StoryObj } from "@storybook/react";
import Header from ".";
import Providers from "../../stories/Providers";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../recoil/cartAtoms.ts";
import type { CartItem, ProductItem } from "../../types/types.ts";

const meta = {
  component: Header,
  title: "Header",
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => {
    const setCartList = useSetRecoilState(cartState);

    const handleAddToCart = () => {
      const newProduct: ProductItem = {
        id: 0,
        imageUrl: "",
        name: "",
        price: 0,
      };
      const newItem: CartItem = {
        checked: false,
        id: 0,
        product: newProduct,
        quantity: 0,
      };
      setCartList((prevCartList: CartItem[]) => [...prevCartList, newItem]);
    };

    const handleAddTo100Cart = () => {
      const newProduct: ProductItem = {
        id: 0,
        imageUrl: "",
        name: "",
        price: 0,
      };
      const newItem: CartItem = {
        checked: false,
        id: 0,
        product: newProduct,
        quantity: 0,
      };
      const newItems = Array.from({ length: 100 }).map(() => newItem);
      setCartList((prevCartList: CartItem[]) => [...prevCartList, ...newItems]);
    };

    return (
      <>
        <Header />
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={handleAddToCart}
            style={{
              border: "1px black solid",
              padding: "5px",
              margin: "5px",
            }}
          >
            장바구니에 아무 아이템을 1개 추가
          </button>
          <button
            onClick={handleAddTo100Cart}
            style={{
              border: "1px black solid",
              padding: "5px",
              margin: "5px",
            }}
          >
            장바구니에 아무 아이템을 100개 추가
          </button>
        </div>
      </>
    );
  },
  args: {},
} satisfies Story;
