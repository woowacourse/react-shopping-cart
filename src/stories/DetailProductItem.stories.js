import DetailProductItem from 'components/DetailProductItem';

export default {
  title: 'Component/DetailProductItem',
  component: DetailProductItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <DetailProductItem {...args} />;

export const DefaultTemplate = Template.bind({});

DefaultTemplate.args = {
  thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
  name: '감자',
  price: 50000,
};
