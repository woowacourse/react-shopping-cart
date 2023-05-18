import { Meta } from '@storybook/react';
import HeaderComponent from '../../../components/common/Header';
import { RecoilRoot } from 'recoil';

const meta = {
  component: HeaderComponent,
  title: 'Components/Header',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <div style={{ width: 'calc(100vw - 32vw)' }}>
            <Story />
          </div>
        </RecoilRoot>
      );
    },
  ],
  args: {
    title: 'STORE',
  },
  argTypes: {
    title: {
      description: '타이틀을 변경할 수  있습니다.',
    },
  },
} satisfies Meta<typeof HeaderComponent>;

export default meta;

export const Cart = (args: any) => {
  return <HeaderComponent title={args.title} onClickCartButton={()=>{}}/>;
};
