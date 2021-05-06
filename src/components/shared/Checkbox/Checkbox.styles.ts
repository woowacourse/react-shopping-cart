import styled from '@emotion/styled';

const Root = styled.section``;

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;

  &:hover .checkmark {
    background-color: #e1f5f4;
  }
`;

const Text = styled.span`
  padding-left: 7px;
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked {
    & ~ .checkmark {
      background-color: ${(props) => props.theme.bgColor.primary};
    }

    & ~ .checkmark:after {
      display: block;
    }
  }
`;

const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.bgColor.primary};
  border-radius: 2px;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export default {
  Root,
  Label,
  Text,
  Checkbox,
  CheckMark,
};
