import styled from '@emotion/styled';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import { COLORS } from 'styles/theme';

import logo from 'assets/logo.png';

const Container = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${COLORS.WHITE};
  padding: 1.7rem 1.2rem;
  border-bottom: 1px solid ${COLORS.GRAY_300};
`;

const LeftMenuButton = styled.button`
  background: unset;
  border: none;
  font-weight: bold;
  font-size: 1.1rem;

  &::before {
    content: '\\f0c9';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    padding-right: 0.938rem;
  }
`;

const Logo = styled(CommonStyled.FlexWrapper)`
  cursor: pointer;
  justify-content: center;
  height: 100%;
  background-image: url(${logo});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
`;

const RightMenu = styled.ul`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 1rem;
`;

const RightMenuButton = styled.li`
  cursor: pointer;
  font-size: 0.9rem;
  padding: 1rem;
  color: ${COLORS.GRAY_500};

  &::before {
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    padding-right: 0.625rem;
    content: '\\${(props) => props.icon}';
  }

  &:hover {
    color: ${COLORS.GRAY_400};
  }
`;

export { Container, LeftMenuButton, Logo, RightMenu, RightMenuButton };
