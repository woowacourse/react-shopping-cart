import { numberWithCommas } from '../../../shared/utils';
import RowProductItem from './RowProductItem';

export default {
  title: 'ShoppingCart/RowProductItem',
  component: RowProductItem,
  argTypes: { children: { control: 'text' } },
};

const Template = args => <RowProductItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜의 풀업 셋트',
  price: `${numberWithCommas(100)} 원`,
  amount: `수량: ${100} 개`,
  imgSrc: 'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
};
