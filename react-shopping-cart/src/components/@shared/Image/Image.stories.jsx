import Image from './Image.component';

import DefaultImage from 'assets/images/baeminImage.png';

export default {
  title: 'Shared/Image',
  component: Image,
  argTypes: {
    type: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};

export const SmallImage = args => <Image src={DefaultImage} {...args} />;
SmallImage.args = {
  type: 'small',
};

export const MediumImage = args => <Image src={DefaultImage} {...args} />;
MediumImage.args = {
  type: 'medium',
};

export const LargeImage = args => <Image src={DefaultImage} {...args} />;
LargeImage.args = {
  type: 'large',
};
