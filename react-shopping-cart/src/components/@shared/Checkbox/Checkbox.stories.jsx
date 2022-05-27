import { useArgs } from '@storybook/client-api';
import Checkbox from './Checkbox.component';
import Text from 'components/@shared/Text/Text.component';

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
};

export const WithLabel = args => {
  const [{ checked }, updateArgs] = useArgs();

  const handleChangeCheckbox = () => {
    updateArgs({ checked: !checked });
  };

  return (
    <Checkbox checked={checked} handleChangeCheckbox={handleChangeCheckbox} {...args}>
      <Text fontSize="small">선택 해제</Text>
    </Checkbox>
  );
};

WithLabel.args = {
  checked: true,
};

export const WithoutLabel = args => {
  const [{ checked }, updateArgs] = useArgs();

  const handleChangeCheckbox = () => {
    updateArgs({ checked: !checked });
  };

  return <Checkbox checked={checked} handleChangeCheckbox={handleChangeCheckbox} {...args} />;
};

WithoutLabel.args = {
  checked: true,
};
