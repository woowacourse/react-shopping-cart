import GridWrapper from ".";
import Product from "../Product";

export default {
  title: "Presentational",
  component: GridWrapper,
};

const Template = (args) => <GridWrapper {...args} />;

export const GridWrapperTemplate = Template.bind({});
GridWrapperTemplate.args = {
  children: Array.from({ length: 10 }).map(() => (
    <Product
      imgUrl="https://i.ibb.co/8X0KLCr/iOS.jpg"
      title="드록바"
      price="3000000"
      onClick={() => {}}
      go={() => {}}
    />
  )),
};
