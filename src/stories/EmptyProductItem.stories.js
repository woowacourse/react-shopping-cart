import EmptyProductItem from 'components/EmptyProductItem';

export default {
  title: 'Component/EmptyProductItem',
  component: EmptyProductItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <EmptyProductItem {...args} />;

export const DefaultTemplate = Template.bind({});
