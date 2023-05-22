import { RecoilRoot } from "recoil";
import { ProductCard } from "../components/productCard/ProductCard";
import { Meta, StoryObj } from "@storybook/react";
import { GlobalStyle } from "../GlobalStyle";
import mockData from "../mocks/mockData.json";

const meta = {
  title: "ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <GlobalStyle />
          {Story()}
        </RecoilRoot>
      );
    },
  ],
  argTypes: {
    name: {
      control: { type: "text" },
    },
    imageUrl: {
      options: mockData.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.imageUrl }), {}),
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductCardComponent: Story = {
  args: {
    id: 1,
    name: "상품명",
    price: 30000,
    imageUrl: "https://cdn-mart.baemin.com/sellergoods/main/212310b6-6560-4895-8171-afce97bc526d.png",
  },
};
