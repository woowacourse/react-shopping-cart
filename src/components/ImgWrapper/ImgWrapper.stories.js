import ImgWrapper from 'components/ImgWrapper';
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
  alt: 'API 에러 이미지',
};

export const Empty = Template.bind({});
Empty.args = {
  src: emptyImg,
  alt: '빈 화면 이미지',
};
