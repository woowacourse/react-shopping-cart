import ItemList from ".";

export default {
  title: "Pages",
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
