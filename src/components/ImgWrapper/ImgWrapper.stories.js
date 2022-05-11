import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';

export default {
  title: 'components/ImgWrapper',
  component: ImgWrapper,
};

const Template = (args) => <ImgWrapper {...args} />;

export const ErrorApi = Template.bind({});
ErrorApi.args = {
  src: errorApiImg,
};

export const Empty = Template.bind({});
Empty.args = {
  src: emptyImg,
};
