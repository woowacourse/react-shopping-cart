import { Meta } from '@storybook/react';
import ProductItemComponent from '../../components/main/ProductItem';
import { styled } from 'styled-components';

const meta = {
  component: ProductItemComponent,
  title: 'Components/ProductItem',
  tags: ['autodocs'],
  parameters: {
    actions: { disabled: true },
  },
  decorators: [
    (Story) => {
      return (
        <S.StoryWrapper>
          <Story onClick={() => {}} />
        </S.StoryWrapper>
      );
    },
  ],
  args: {
    id: 1,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imgUrl: `${process.env.PUBLIC_URL}/assets/product1.svg`,
  },
  argTypes: {
    id: {
      description: '상품의 ID를 표기합니다.',
    },
    name: {
      description: '상품의 이름을 표기합니다.',
    },
    price: {
      description: '상품의 가격을 표기합니다.',
    },
    imgUrl: {
      description: '상품의 이미지 URL입니다.',
    },
  },
} satisfies Meta<typeof ProductItemComponent>;

export default meta;

export const ProductItem = (args: any) => {
  return (
    <S.Wrapper>
      <ProductItemComponent id={args.id} name={args.name} price={args.price} imgUrl={args.imgUrl} />
    </S.Wrapper>
  );
};

const S = {
  StoryWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100vw - 10vw);
  `,

  Wrapper: styled.div`
    width: 50%;
    height: auto;
  `,
};
