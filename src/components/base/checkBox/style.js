import styled from 'styled-components';

const BaseCheckBox = styled.input`
  width: 25px;
  height: 25px;
  border: 3px solid #707070;
  border-radius; 0px;
  position: relative;
  margin-right: 10px;
`;

const BaseLabel = styled.label`
  display: flex;
  align-items: center;
`;

export { BaseCheckBox, BaseLabel };
