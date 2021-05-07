import List from '.';
import { PRODUCT_LIST_MOCK } from '../../../mock';

export default {
  component: List,
  title: 'components/shared/List',
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: PRODUCT_LIST_MOCK,
};
