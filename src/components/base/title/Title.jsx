import { TitleText, TitleUnderLine } from './style';

const Title = ({ title }) => {
  return (
    <div>
      <TitleText>{title}</TitleText>
      <TitleUnderLine></TitleUnderLine>
    </div>
  );
};

export default Title;
