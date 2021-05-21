import List from '.';
import { PRODUCT_LIST_MOCK } from '../../../mocks/mockData';

export default {
  component: List,
  title: 'components/shared/List',
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: PRODUCT_LIST_MOCK,
};
