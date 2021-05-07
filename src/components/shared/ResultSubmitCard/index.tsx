import { VFC } from 'react';
import Text from '../Text';
import {
  ResultSubmitButton,
  ResultAmountContainer,
  ResultInnerContainer,
  ResultTitle,
  ResultSubmitCardContainer,
} from './style';

interface Props {
  title: string;
  resultDescription: string;
  resultAmount: string;
  buttonText: string;
}

const ResultSubmitCard: VFC<Props> = ({ title, resultDescription, resultAmount, buttonText }) => {
  return (
    <ResultSubmitCardContainer>
      <ResultTitle>{title}</ResultTitle>
      <ResultInnerContainer>
        <ResultAmountContainer>
          <Text>{resultDescription}</Text>
          <Text>{resultAmount}</Text>
        </ResultAmountContainer>
        <ResultSubmitButton>{buttonText}</ResultSubmitButton>
      </ResultInnerContainer>
    </ResultSubmitCardContainer>
  );
};

export default ResultSubmitCard;
