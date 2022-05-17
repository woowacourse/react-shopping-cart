import { TitleText } from './style';
import { TitleUnderLine } from './style';

const PageTitle = ({ title }) => {
  return (
    <div>
      <TitleText>{title}</TitleText>
      <TitleUnderLine></TitleUnderLine>
    </div>
  );
};

export default PageTitle;
