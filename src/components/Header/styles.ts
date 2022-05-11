import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 60px;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;

  cursor: pointer;

  & img {
    width: 40px;
    height: 36px;
  }

  & div {
    padding: 14px 20px 5px;
    font-size: 30px;
    font-weight: 900;
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  width: 160px;
  justify-content: space-between;
  font-weight: 500;
  font-size: 20px;
  color: #fff;

  & div {
    cursor: pointer;
  }
`;

export { HeaderWrapper, HeaderTitle, HeaderMenu };
