import styled from 'styled-components';

import NavigateButton from 'components/@shared/NavigateButton/NavigateButton';

//재사용X
function HomeButton({ title, emoji }) {
  return (
    <Styled.Root to="/">
      {emoji}
      <div>{title}</div>
    </Styled.Root>
  );
}

// THINK: NaviagateButton을 상속받는 것이 안전할까?
const Styled = {
  Root: styled(NavigateButton)`
    font-size: 28px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 900;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;

    text-align: center;
    vertical-align: middle;

    & svg {
      width: 35px;
      height: 35px;
    }

    & path {
      fill: ${({ theme }) => theme.colors.white};
    }
  `,
};

export default HomeButton;
