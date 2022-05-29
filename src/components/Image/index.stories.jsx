import Image from '.';
import { dummyProductList } from 'dummy_data';

export default {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    src: { control: 'select', options: dummyProductList.map(product => product.image) },
  },
};

const Template = args => <Image {...args} />;

export const ImageTemplate = Template.bind({});
ImageTemplate.args = {
  src: 'https://cdn-mart.baemin.com/sellergoods/main/aab933ad-69bb-41f5-9fe9-ad821f77baef.jpg',
  alt: '식빵(990g)',
  size: '282px',
};
