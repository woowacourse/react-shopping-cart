import StatusMessage from '.';

export default {
  title: 'Component/@Common/StatusMessage',
  component: StatusMessage,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <StatusMessage {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  status: 'loading',
  children: '로딩 상태를 출력하는 컴포넌트입니다.',
};

export const ContentEmpty = Template.bind({});
ContentEmpty.args = {
  status: 'empty',
  children: '텅! 장바구니에 담은 상품이 없어요!',
};

export const Error = Template.bind({});
Error.args = {
  status: 'error',
  children: '이곳에 오류 내용이 출력됩니다.',
};
