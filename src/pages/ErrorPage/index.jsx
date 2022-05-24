import React from "react";
import { Link } from "react-router-dom";

import Button from "./../../components/common/Button";
import { StyledButtonWrapper } from "./index.styled";

import { PATH } from "./../../constants/index";

function ErrorPage() {
  return (
    <div>
      <h2>잘못된 접근입니다.</h2>
      <StyledButtonWrapper>
        <Link to={PATH.ROOT}>
          <Button>홈으로</Button>
        </Link>
      </StyledButtonWrapper>
    </div>
  );
}

export default ErrorPage;
