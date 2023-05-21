import { Meta, StoryObj } from '@storybook/react';
import PriceComponent from '../../components/Price';

const meta = {
  component: PriceComponent,
  title: 'Components/Price',
  tags: ['autodocs'],
} satisfies Meta<typeof PriceComponent>;

export default meta;

type Story = StoryObj<typeof PriceComponent>;

export const Price: Story = {
  args: {
    price: 10000,
    description: '상품 가격: ',
    tag: 'p',
  },

  argTypes: {
    price: {
      description: '가격을 변경할 수 있습니다.<br> 세자리 단위로 `콤마(,)`가 찍힙니다.',
    },

    description: {
      description: '설명을 추가할 수 있습니다.',
    },

    tag: {
      description:
        '`Price` 컴포넌트의 태그를 변경할 수 있습니다.<br> 설정하지 않는다면 기본 태그인 `p` 태그가 적용됩니다.',
    },

    css: {
      description: '`Price` 컴포넌트를 디자인 할 수 있습니다.',
    },
  },
};
