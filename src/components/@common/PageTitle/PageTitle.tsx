import { css } from "@emotion/css";
import Text from "../Text/Text";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className={pageTitleStyle}>
      <div className={titleTextStyle}>
        <Text testId="page-title" text={title} type="large" />
      </div>
      {description &&
        description
          .split("\n")
          .map((line, index) => <Text key={index} text={line} />)}
    </div>
  );
};

export default PageTitle;

const pageTitleStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
`;

const titleTextStyle = css`
  margin-bottom: 8px;
`;
