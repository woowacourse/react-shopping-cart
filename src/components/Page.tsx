import { ReactNode } from "react";
import { styled } from "styled-components";

const Page = ({ children }: { children: ReactNode }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

const PageWrapper = styled.section`
  display: flex;
  padding: 90px 5%;
`;

export default Page;
