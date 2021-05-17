import NotFound, { Props } from './NotFound';

export default {
  title: 'Components/Commons/NotFound',
  component: NotFound,
  argTypes: {},
};

const Template = (args: Props) => <NotFound {...args} />;

export const Default = Template.bind({});

(Default as any).args = {
  message: '정보를 찾을 수 없습니다.',
};
