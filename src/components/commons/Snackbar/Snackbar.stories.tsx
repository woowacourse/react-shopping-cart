import Snackbar, { Props } from './Snackbar';

export default {
  title: 'Components/Commons/Snackbar',
  component: Snackbar,
  argTypes: {},
};

const Template = (args: Props) => <Snackbar {...args}>test</Snackbar>;

export const Default = Template.bind({});

(Default as any).args = {
  duration: 700,
};
