import ProductListPage from "pages/ProductListPage/ProductListPage";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ProductListPage",
  component: ProductListPage,
} as Meta;

const Template: Story = () => <ProductListPage />;

export const DefaultProductListPage = Template.bind({});
