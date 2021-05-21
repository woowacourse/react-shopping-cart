import { FC } from 'react';
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
  className?: string;
}

const ResultSubmitCard: FC<Props> = ({
  title,
  resultDescription,
  resultAmount,
  buttonText,
  className,
}) => (
  <ResultSubmitCardContainer className={className}>
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

export default ResultSubmitCard;
