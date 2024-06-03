import styled from 'styled-components';

export const ButtonStyle = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 5px 9px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(10, 13, 19, 1);

  ${(props) =>
    props.className === 'couponButton' &&
    `border: 1px solid rgba(51, 51, 51, 0.25); width: 100%; height:48px; font-weight: 700; font-size:15px; color: rgba(51, 51, 51, 0.75);
  `}
`;

export const couponButton = styled.button`
  width: 100%;
  background: red;
`;
