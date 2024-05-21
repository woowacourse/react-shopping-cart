import { PropsWithChildren } from "react";
import { PageHeaderContainer } from "../../pages/CartPage/styles";
import { Description, Title } from "../../pages/ConfirmOrderPage/styles";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
  title,
  children,
}) => {
  return (
    <PageHeaderContainer>
      <Title>{title}</Title>
      <Description>{children}</Description>
    </PageHeaderContainer>
  );
};

export default PageHeader;
