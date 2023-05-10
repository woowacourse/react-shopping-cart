import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const BadgeContainer = styled.div`
  display: inline-flex;
  justify-content: center;

  min-width: 26px;
  height: 26px;

  border-radius: 13px;
  background-color: #04c09e;
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

type BadgeProps = PropsWithChildren;

const Badge = (props: BadgeProps) => {
  const { children } = props;

  return <BadgeContainer>{children}</BadgeContainer>;
};

export default Badge;
