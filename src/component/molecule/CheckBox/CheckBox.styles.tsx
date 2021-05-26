import styled from '@emotion/styled';

interface LabelProps {
  size: string;
}

const Input = styled.input`
  display: none;

  &:checked + label {
    background-color: #22a6a2;
    text-align: center;
  }

  &:checked + label:before {
    content: '\\2714';
    color: white;
    vertical-align: middle;
  }
`;

const Label = styled.label`
  display: inline-block;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  cursor: pointer;
  ${({ size }: LabelProps) => `width: ${size}; height: ${size};`};
`;

export { Input, Label };
