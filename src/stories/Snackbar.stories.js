import Snackbar from 'components/Snackbar';

export default {
  title: 'Component/Snackbar',
  component: Snackbar,
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

const Template = (args) => <Snackbar {...args} />;

export const DefaultTemplate = Template.bind({});
