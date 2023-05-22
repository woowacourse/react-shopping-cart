import { styled } from "styled-components";

export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

const Wrapper = styled.button`
  margin-top: 20px;
  border-radius: 5px;
  width: 90%;
  height: 40px;
  background: var(--dark-gray);
  color: white;
  cursor: pointer;

  &:disabled {
    background: var(--light-gray);
  }

  &:not(:disabled):hover {
    box-shadow: 0 10px 10px -3px var(--shadow-gray);
    transition: all 0.3s ease;
  }
`;
