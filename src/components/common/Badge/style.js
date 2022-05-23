import styled from 'styled-components';

const BadgeBox = styled.div`
  background-color: ${({theme}) => theme.COLOR.PINK};
  color: ${({theme}) => theme.COLOR.WHITE};
  border-radius: 50%;

  width: 22px;
  height: 22px;

  text-align: center;
  line-height: 22px;

  position: relative;
  top: -40px;
  right: -80px;
`;

export {BadgeBox};
