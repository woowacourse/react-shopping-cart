import styled from '@emotion/styled';

export default function SelectInput({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <SelectInputBox type="checkbox" {...rest} />;
}

const SelectInputBox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: black;
`;
