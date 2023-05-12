import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

type BadgeContainerProps = {
  $show?: boolean;
};

const BadgeContainer = styled.div<BadgeContainerProps>`
  display: inline-flex;
  justify-content: center;

  min-width: 26px;
  height: 26px;

  border-radius: 13px;
  background-color: #04c09e;
  font-size: 16px;
  font-weight: 500;
  color: white;

  transform: scale(${(props) => (props.$show ? '1' : '0')});
  transition: transform 0.05s;
`;

type BadgeProps = PropsWithChildren<{
  show?: boolean;
}>;

const Badge = (props: BadgeProps) => {
  const { show = true, children } = props;

  return <BadgeContainer $show={show}>{children}</BadgeContainer>;
};

export default Badge;
