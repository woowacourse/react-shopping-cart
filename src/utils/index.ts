import { CountMethod } from 'src/hooks/useCartUpdate';

export const convertKORWon = (number: number) => {
  return `${number.toLocaleString('KR')}원`;
};

export const countStepOperator = (type: CountMethod, step: number) => {
  switch (type) {
    case 'increase':
      return step;
    case 'decrease':
      return step * -1;
    default:
      return 0;
  }
};
