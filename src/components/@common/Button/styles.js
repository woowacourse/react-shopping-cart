import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

import { COLORS } from 'styles/theme';

// Todo
// - 버튼 타입 설정
// - 스타일링 정리
// - 라우팅 설치

const BUTTON_TYPE = {
  BUTTON: css`
    padding: 0.8rem 1.2rem;
  `,

  ICON: css`
    padding: 0.25rem 0.35rem;
  `,
};

const Container = styled.button`
  cursor: pointer;

  font-size: 1rem;
  border: 1px solid #ddd;
  background-color: #f3f3f3;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;

  ${({ containerType }) => BUTTON_TYPE[containerType]}

  &::before {
    content: '\\${({ icon }) => icon}';

    font-size: 0.8rem;
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    ${({ containerType }) =>
      containerType === 'BUTTON' &&
      css`
        padding-right: 0.5rem;
      `}
  }

  &:hover {
    color: ${COLORS.BLUERIBBON};
    background-color: ${COLORS.CONCRETE};
  }
`;

export { Container };
