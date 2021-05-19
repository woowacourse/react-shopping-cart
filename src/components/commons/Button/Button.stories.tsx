import { COLORS } from '../../../constants';
import Button, { Props } from './Button';

export default {
  title: 'Components/Commons/Button',
  component: Button,
  argTypes: {},
};

const Template = (args: Props) => <Button {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  fontColor: COLORS.WHITE,
  backgroundColor: COLORS.MINT_500,
  size: 'MD',
  children: '버튼',
};
