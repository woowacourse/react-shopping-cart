import * as S from './PriceTable.style';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';
import { ReactNode } from 'react';
import NoticeMessage from '../NoticeMessage/NoticeMessage';

type PriceTableProps = {
  name: string;
  price: number | string;
  upperDivider?: boolean;
};

const PriceTableRow = ({ name, price, upperDivider }: PriceTableProps) => {
  const formatContent = () => {
    if (typeof price === 'string') return price;
    else return `${price.toLocaleString('ko-kr')}원`;
  };
  return (
    <>
      {upperDivider && <Divider />}
      <ContentRow title={name} content={formatContent()} />
    </>
  );
};

const PriceTableMain = ({ children }: { children: ReactNode }) => {
  return (
    <S.Container>
      <NoticeMessage message="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다." />
      <Divider />
      <S.Rows>{children}</S.Rows>
    </S.Container>
  );
};

export const PriceTable = Object.assign(PriceTableMain, {
  Row: PriceTableRow,
});
