import { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HeaderComponent from '../../../components/common/Header';

const meta = {
  component: HeaderComponent,
  title: 'Components/Header',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <RecoilRoot>
            <div style={{ width: 'calc(100vw - 32vw)' }}>
              <Story />
            </div>
          </RecoilRoot>
        </BrowserRouter>
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

interface CartProps {
  title: string;
}

export const Header = (args: CartProps) => {
  return <HeaderComponent title={args.title} />;
};
