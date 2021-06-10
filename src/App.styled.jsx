import styled from "styled-components";
import { MEDIA_QUERY } from "./constants/style";

export const App = styled.div`
  padding: 0 1rem;
  min-width: 22rem;
`;
export const Main = styled.main`
  max-width: ${MEDIA_QUERY.DESKTOP_WIDE};
  margin: 0 auto;
  padding: 2rem 0;
  margin-top: 5rem;
`;
