import { Route, Routes } from "react-router-dom";
import ProductDetailsPage from ".";

export default {
  title: "Pages",
  component: ProductDetailsPage,
};

const Template = (args) => (
  <Routes>
    <Route path="/product/:id" element={<ProductDetailsPage {...args} />} />
  </Routes>
);

export const ProductDetailsPageTemplate = Template.bind({});
ProductDetailsPageTemplate.args = {};
