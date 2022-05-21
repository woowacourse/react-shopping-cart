import { Spinner } from 'components/@common';

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
