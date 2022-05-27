import TitleBox from './TitleBox.component';

export default {
  title: 'Shared/TitleBox',
  component: TitleBox,
};

export const DefaultTitleBox = args => <TitleBox {...args}>제목</TitleBox>;
DefaultTitleBox.args = {};
