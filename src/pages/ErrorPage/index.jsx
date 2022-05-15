import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "./../../constants/index";
import BoxButton from "./../../components/common/BoxButton";
import styled from "styled-components";

function ErrorPage() {
  return (
    <div>
      <h2>잘못된 접근입니다.</h2>
      <Link to={PATH.ROOT}>
        <ButtonWrapper>
          <BoxButton>홈으로</BoxButton>
        </ButtonWrapper>
      </Link>
    </div>
  );
}

const ButtonWrapper = styled.div`
  margin: 60px 20px 0px;
`;

export default ErrorPage;
