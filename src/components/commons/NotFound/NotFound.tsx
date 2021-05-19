import * as Styled from './NotFound.styles';
import notFoundPNG from '../../../assets/images/not-found.png';

export interface Props {
  message: string;
}

const NotFound = ({ message }: Props) => {
  return (
    <Styled.NotFound>
      <Styled.Wrapper>
        <Styled.Image src={notFoundPNG} alt="not found image" />
        <Styled.Message>{message}</Styled.Message>
      </Styled.Wrapper>
    </Styled.NotFound>
  );
};

export default NotFound;
