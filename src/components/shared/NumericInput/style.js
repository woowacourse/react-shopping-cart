import styled from 'styled-components';
import COLOR from '../../../constants/color';

export const Container = styled.div`
  display: flex;
  width: 114px;
  height: 60px;
  outline: 1px solid ${COLOR['GRAY-200']};
`;

export const Input = styled.input`
  width: 72px;
  font-size: 1.5rem;
  color: ${COLOR.BLACK};
  outline: none;
  border: 0;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 30px;
  margin: 0;
  background-color: ${COLOR.WHITE};
  border: 0;
  outline: 1px solid ${COLOR['GRAY-200']};
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

export const Icon = styled.img`
  width: 12px;
`;
