import React from "react";
import PropTypes from "prop-types";
import * as S from "./Empty.styled";
import { IMAGE } from "../../../constants/constant";

const Empty = ({ children }) => (
  <S.Empty>
    <S.Img src={IMAGE.EMPTY} alt="텅" />
    {children}
  </S.Empty>
);

Empty.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Empty;
