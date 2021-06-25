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
  isSubmitDisabled?: boolean;
}

const ResultSubmitCard: FC<Props> = ({
  title,
  resultDescription,
  resultAmount,
  buttonText,
  className,
  isSubmitDisabled = false,
}) => (
  <ResultSubmitCardContainer className={className}>
    <ResultTitle>{title}</ResultTitle>
    <ResultInnerContainer>
      <ResultAmountContainer>
        <Text>{resultDescription}</Text>
        <Text>{resultAmount}</Text>
      </ResultAmountContainer>
      <ResultSubmitButton disabled={isSubmitDisabled}>{buttonText}</ResultSubmitButton>
    </ResultInnerContainer>
  </ResultSubmitCardContainer>
);

export default ResultSubmitCard;
