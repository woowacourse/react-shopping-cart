import { Spinner } from 'component/@common';

export default {
  title: 'Component/@Common/Spinner',
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
