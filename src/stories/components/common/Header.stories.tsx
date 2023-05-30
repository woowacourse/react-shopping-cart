import { Meta } from '@storybook/react';
import HeaderComponent from '../../../components/@common/Header';
import { styled } from 'styled-components';

const meta = {
  component: HeaderComponent,
  title: 'Components/Common/Header',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 'calc(100vw - 32vw)' }}>
          <Story />
        </div>
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

export const Header = (args: any) => {
  return (
    <Wrapper>
      <HeaderComponent title={args.title} onClickCartButton={() => {}} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: calc(100vw);
  top: 0;
  left: 0;
`;
