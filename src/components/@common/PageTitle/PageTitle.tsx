import { css } from "@emotion/css";
import Text from "../Text/Text";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className={pageTitleStyle}>
      <Text testId="page-title" text={title} type="large" />
      {description && <Text text={description} />}
    </div>
  );
};

export default PageTitle;

const pageTitleStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
`;
