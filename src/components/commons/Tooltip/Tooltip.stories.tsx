import Tooltip, { Props } from './Tooltip';
import Button from '../Button/Button';

export default {
  title: 'Components/Commons/Tooltip',
  component: Tooltip,
  argTypes: {},
};

const Template = (args: Props) => <Tooltip {...args}>상품을 장바구니에 담았습니다</Tooltip>;

export const Default = Template.bind({});

(Default as any).args = {
  button: <Button size="SM">장바구니 가기</Button>,
};
