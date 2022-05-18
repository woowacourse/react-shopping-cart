import ItemList from ".";

export default {
  title: "Page",
  component: ItemList,
  decorators: [
    (Story) => (
      <div style={{ marginTop: "-150px" }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <ItemList {...args} />;

export const ItemListTemplate = Template.bind({});
ItemListTemplate.args = {};
