import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Header({ children, ...props }: Props) {
  return <StyledHeader {...props}>{children}</StyledHeader>;
}

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 80px;
  background: ${({
    theme: {
      colors: { emerald },
    },
  }) => emerald};
`;

export default Header;
