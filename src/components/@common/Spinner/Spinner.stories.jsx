import Spinner from './Spinner';

export default {
  title: 'Components/@Common/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <Spinner {...args} />;

const DefaultSpinner = Template.bind({});

DefaultSpinner.args = {
  children: '🐯',
};

export { DefaultSpinner };
