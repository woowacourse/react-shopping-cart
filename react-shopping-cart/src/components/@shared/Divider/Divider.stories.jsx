import Divider from './Divider.component';
import { PALETTE } from 'styles/theme';
export default {
  title: 'Shared/Divider',
  component: Divider,
};

export const Default = args => <Divider {...args} />;

Default.args = {
  height: '4px',
  backgroundColor: PALETTE.BLACK_001,
};
