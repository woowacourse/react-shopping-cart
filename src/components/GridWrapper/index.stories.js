import GridWrapper from ".";
import Item from "../Item";

export default {
  title: "presentional",
  component: GridWrapper,
};

const Template = (args) => <GridWrapper {...args} />;

export const GridWrapperTemplate = Template.bind({});
GridWrapperTemplate.args = {
  children: Array.from({ length: 10 }).map(() => (
    <Item
      imgUrl="https://i.ibb.co/8X0KLCr/iOS.jpg"
      title="드록바"
      price="3000000"
      onClick={() => {}}
      go={() => {}}
    />
  )),
};
