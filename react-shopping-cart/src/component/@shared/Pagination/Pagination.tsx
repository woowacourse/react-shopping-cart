import styled from "styled-components";
import PaginationButton from "component/@shared/PaginationButton/PaginationButton";
import { ROUTE_PATH } from "constants/index";

const PaginationBox = styled.div`
  display: flex;
  gap: 15px;
`;

const Pagination = () => {
  return (
    <PaginationBox>
      {new Array(5).fill("").map((_, i) => (
        <PaginationButton key={i} to={`${ROUTE_PATH.ROOT}${i + 1}`}>
          {i + 1}
        </PaginationButton>
      ))}
    </PaginationBox>
  );
};

export default Pagination;
