import styled from "styled-components";
import { MEDIA_QUERY } from "../../constants/style";

export const ProductsList = styled.section`
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(14.5rem, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2.5rem;

  @media (max-width: ${MEDIA_QUERY.DESKTOP}) {
    grid-template-columns: repeat(3, minmax(14.5rem, 1fr));
  }

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    grid-template-columns: repeat(2, minmax(14.5rem, 1fr));
    grid-row-gap: 3.5rem;
  }

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    grid-template-columns: repeat(1, minmax(14.5rem, 1fr));
  }
`;
