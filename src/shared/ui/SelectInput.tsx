import styled from '@emotion/styled';
import React from 'react';

type SelectInputProps = React.ComponentPropsWithoutRef<'input'>;

export default function SelectInput({ ...rest }: SelectInputProps) {
  return <SelectInputBox {...rest} />;
}

const SelectInputBox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: black;
`;
