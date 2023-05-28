import { ReactNode } from "react";
import styled from "styled-components";

export const Page = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  padding: 110px 10px;
`;
