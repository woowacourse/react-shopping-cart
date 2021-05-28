import Pagination, { Props } from './Pagination';

export default {
  title: 'Components/Commons/Pagination',
  component: Pagination,
};

const Template = (args: Props) => <Pagination {...args}></Pagination>;

export const Default = Template.bind({});
(Default as any).args = {};
