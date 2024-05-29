import styled from "styled-components";

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function Button({ children, ...attributes }: IButtonProps) {
  return <S.Button {...attributes}>{children}</S.Button>;
}

const S = {
  Button: styled.button`
    position: fixed;
    bottom: 0;
    max-width: 429px;

    height: 64px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    width: 100%;

    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    &:disabled {
      background-color: rgba(190, 190, 190, 1);
    }
    border-radius: 0;
  `,
};
