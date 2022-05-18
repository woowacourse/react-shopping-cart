import styled from 'styled-components';

// 재사용O
function Header({ left, right }) {
  return (
    <Styled.Root>
      {left}
      {right}
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.header`
    width: 100%;
    height: 65px;
    margin-bottom: 40px;
    display: flex;
    padding: 0 180px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.cyon_02};
    justify-content: space-between;
    box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.opacity_black_02};
  `,
};

export default Header;
