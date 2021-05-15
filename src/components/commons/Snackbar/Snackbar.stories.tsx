import { COLORS } from '../../../constants';
import Snackbar, { Props } from './Snackbar';

export default {
  title: 'Components/Commons/Snackbar',
  component: Snackbar,
  argTypes: {},
};

const Template = (args: Props) => <Snackbar {...args} />;

export const Default = Template.bind({});

(Default as any).args = {};
