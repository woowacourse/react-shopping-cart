import styled from 'styled-components';

//재사용O
function CheckBox({ children, ...props }) {
  return (
    <Styled.Root type="checkbox" {...props}>
      {children}
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.input`
    appearance: none;
    border: 1px solid ${({ theme }) => theme.colors.cyon_02};
    border-radius: 2px;
    width: 18px;
    height: 18px;
    cursor: pointer;

    :focus {
      outline: none;
    }

    :checked {
      background-color: ${({ theme }) => theme.colors.cyon_02};
    }

    :after {
      content: '✔';
      width: 100%;
      height: 100%;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.white};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};

export default CheckBox;
