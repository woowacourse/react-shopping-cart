import { Link } from "react-router-dom";
import styled from "styled-components";

import { COLOR } from "../../constants/theme";

const Li = styled.li`
  display: flex;
  width: 100%;
  padding: 2.5% 2.2%;
  border-top: 1px solid ${COLOR.GRAY_250};
  background-color: ${COLOR.WHITE};
`;

const Desc = styled.div`
  /* flex-grow: 1; */
  width: 100%;
  margin-left: 2%;
`;

const NameLink = styled(Link)`
  display: inline-block;
  font-size: 1.25rem;
  color: ${COLOR.GRAY_600};
  margin-bottom: 0.8rem;

  :hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const OptionPricePart = styled.p`
  font-size: 1rem;
  color: ${COLOR.GRAY_350};
`;

export { Li, Desc, NameLink, OptionPricePart };
