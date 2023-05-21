import { StyleCheckBox, StyleCheckMark, StyleLabel } from './CheckBox.style';

const CheckBox = () => (
  <div>
    <StyleLabel>
      <StyleCheckBox />
      <StyleCheckMark />
    </StyleLabel>
    <span>안녕하세요.</span>
  </div>
);

export default CheckBox;
