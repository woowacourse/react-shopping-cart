import { css } from "@emotion/css";
import Text from "../@common/Text/Text";

interface PageTitleProps {
  title: string;
  titleCaption?: React.ReactNode;
}

const PageTitle = ({ title, titleCaption }: PageTitleProps) => {
  return (
    <div className={PageTitleStyle}>
      <Text text={title} type="large" />
      {titleCaption}
    </div>
  );
};

export default PageTitle;

const PageTitleStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
`;
