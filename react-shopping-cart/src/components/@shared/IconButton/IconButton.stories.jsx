import IconButton from './IconButton.component';
import DefaultImage from 'assets/images/baeminImage.png';

export default {
  title: 'IconButton',
  component: IconButton,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

const defaultImageURL = DefaultImage;

export const SmallIconButton = args => <IconButton {...args} />;
SmallIconButton.args = {
  size: 'small',
  imageUrl: DefaultImage,
};

export const MediumIconButton = args => <IconButton {...args} />;
MediumIconButton.args = {
  size: 'medium',
  imageUrl: defaultImageURL,
};
