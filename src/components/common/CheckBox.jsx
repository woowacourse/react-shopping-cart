import React, { useState } from "react";
import styled from "styled-components";

function CheckBox({ checked, onClick }) {
  return <StyledInput type={"checkbox"} checked={checked} onClick={onClick} />;
}

const StyledInput = styled.input`
  appearance: none;

  width: 28px;
  height: 28px;

  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.white};

  :hover {
    cursor: pointer;
  }

  :checked {
    background-color: ${({ theme }) => theme.color.primary};
    background-position: 30% 45%;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='23' height='17' viewBox='0 0 23 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 7L9.11069 14.1107L21.8318 1.38956' stroke='white' stroke-width='3'/%3E%3C/svg%3E%0A");
  }
`;

export default CheckBox;
