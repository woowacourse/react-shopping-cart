import styled from "styled-components";

// export const SnackBarContainer = styled.div`
//   position: fixed;
//   bottom: 0;
//   left: 50%;
//   margin-bottom: 30px;
//   transform: translate(-50%);
// `;

export const SnackBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-bottom: 30px;
  transform: translate(-50%);
  min-width: 300px;
  background-color: #2ac1bc;
  padding: 15px;
  margin-top: 3px;
  border-radius: 4px;
  opacity: 1;
  animation: fadein 0.5s fadeout 0.5s 2.5s;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
`;

export const SnackBarMessage = styled.p`
  font-weight: 600;
  text-align: center;
  color: #fff;
  text-decoration: none;
`;
