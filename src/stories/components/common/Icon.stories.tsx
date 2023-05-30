import { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';
import IconComponent from '../../../components/@common/Icon';
import { CART_PATH } from '../../../constants/svgPath';

const meta = {
  component: IconComponent,
  title: 'Components/Common/Icon',
  tags: ['autodocs'],

  argTypes: {
    onClick: {
      options: {
        Whatever: () => {},
      },
    },
  },
} satisfies Meta<typeof IconComponent>;

export default meta;

type Story = StoryObj<typeof IconComponent>;

const mirrorReversal = css`
  transform: scaleX(-1);
`;

export const Cart: Story = {
  args: {
    width: '30',
    height: '27',
    color: '#AAA',
    path: CART_PATH,
    viewBox: '0 0 51 44',
    svgStyle: mirrorReversal,
  },

  argTypes: {
    width: {
      control: {
        type: 'text',
      },
      description: '숫자를 입력하여 아이콘의 너비(width)를 정할 수 있습니다.',
    },
    height: {
      description: '숫자를 입력하여 아이콘의 높이(height)를 정할 수 있습니다.',
    },
    color: {
      control: {
        type: 'color',
      },
      description: '아이콘의 색상을 정할 수 있습니다.',
    },
    path: {
      options: {
        'Cart Icon': CART_PATH,
      },
      control: {
        type: 'radio',
      },
      description: '아이콘의 모양을 선택할 수 있습니다.',
    },
    viewBox: {
      description:
        'view-box는 아이콘이 보여지는 영역에서, 아이콘의 크기를 확대 또는 축소 그리고 위치를 조정할 수 있는 속성입니다.<br>(일종의 좌표 평면이라고 할 수 있다.)<br> 네 개의 숫자는 각각 view-box의 `min-x`(아이콘이 그려지는 영역의 시작점), `min-y`(왼쪽 상단의 꼭짓점), `width`, `height`을 의미합니다.',
    },
    svgStyle: {
      options: {
        원본: '',
        '좌우 반전': mirrorReversal,
      },
      control: {
        type: 'radio',
      },
      description: '아이콘의 스타일을 변경할 수 있습니다.',
    },
  },
};

export const HeaderCart: Story = {
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: 'calc(100vw - 32vw)',
            padding: '20px',
            background: '#333',
          }}
        >
          <Story />
        </div>
      );
    },
  ],

  args: {
    width: '50',
    height: '44',
    color: '#fff',
    path: CART_PATH,
    viewBox: '0 0 51 44',
  },

  argTypes: {
    width: {
      control: {
        type: 'text',
      },
    },
    color: {
      control: {
        type: 'color',
      },
    },
    path: {
      options: {
        'Cart Icon': CART_PATH,
      },
      control: {
        type: 'radio',
      },
    },
    svgStyle: {
      control: {
        disable: true,
      },
    },
    onClick: {
      control: {
        disable: true,
      },
    },
  },
};
