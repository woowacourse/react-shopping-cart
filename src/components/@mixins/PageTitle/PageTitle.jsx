import React from "react";
import PropTypes from "prop-types";
import * as S from "./PageTitle.styled";

const PageTitle = ({ children }) => <S.PageTitle>{children}</S.PageTitle>;

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitle;
