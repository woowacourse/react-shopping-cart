import { Route, Routes } from "react-router-dom";
import Detail from ".";

export default {
  title: "Page",
  component: Detail,
};

const Template = (args) => (
  <Routes>
    <Route path="/product/:id" element={<Detail {...args} />} />
  </Routes>
);

export const DetailPageTemplate = Template.bind({});
DetailPageTemplate.args = {};
