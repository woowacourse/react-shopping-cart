import { LoadingSpinner } from 'component';

export default {
  title: 'Component/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
};

const Template = args => <LoadingSpinner {...args} />;

const DefaultLoadingSpinner = Template.bind({});

export { DefaultLoadingSpinner };
