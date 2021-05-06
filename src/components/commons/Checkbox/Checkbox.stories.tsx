import { COLORS } from '../../../constants';
import Checkbox, { Props } from './Checkbox';

export default {
  title: 'Components/Commons/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template = (args: Props) => <Checkbox {...args} />;

export const Default = Template.bind({});

Default.args = {
  labelText: '라벨 텍스트',
};
