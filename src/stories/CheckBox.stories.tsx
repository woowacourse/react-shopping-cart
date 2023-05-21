import { useState } from 'react';

import { GlobalStyle } from '../GlobalStyle';
import { Meta } from '@storybook/react';
import { CheckBox } from '../layout/checkBox/CheckBox';

const meta = {
  title: 'CheckBox',
  component: CheckBox,
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
} as Meta;

export default meta;

export const CheckBoxComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClickCheckBox = () => {
    setIsChecked((current) => !current);
  };

  return (
    <CheckBox
      isChecked={isChecked}
      id={Math.random()}
      handleClickCheckBox={handleClickCheckBox}
    />
  );
};
