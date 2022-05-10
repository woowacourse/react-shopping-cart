import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 60px;

  cursor: pointer;

  & img {
    width: 50px;
    height: 45px;
  }

  & div {
    padding: 14px 20px 5px;
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  font-weight: 500;
  font-size: 24px;
  color: #fff;

  & div {
    cursor: pointer;
  }
`;

export { HeaderWrapper, HeaderTitle, HeaderMenu };
