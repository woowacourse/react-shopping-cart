import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "./../../components/common/Button";

import { PATH } from "./../../constants/index";

function ErrorPage() {
  return (
    <div>
      <h2>잘못된 접근입니다.</h2>
      <ButtonWrapper>
        <Link to={PATH.ROOT}>
          <Button>홈으로</Button>
        </Link>
      </ButtonWrapper>
    </div>
  );
}

const ButtonWrapper = styled.div`
  margin: 60px 20px 0px;
`;

export default ErrorPage;
