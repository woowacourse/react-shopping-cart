import PageTitle, { Props } from './PageTitle';

export default {
  title: 'Components/Commons/PageTitle',
  component: PageTitle,
  argTypes: {},
};

const Template = (args: Props) => <PageTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '주문목록',
};
