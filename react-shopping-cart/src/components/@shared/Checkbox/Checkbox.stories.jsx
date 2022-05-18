import Checkbox from './Checkbox.component';
import Text from 'components/@shared/Text/Text.component';

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
};

export const WithLabel = args => (
  <Checkbox {...args}>
    <Text fontSize="small">선택 해제</Text>
  </Checkbox>
);

export const WithoutLabel = args => <Checkbox {...args} />;
