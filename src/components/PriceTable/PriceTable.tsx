import * as S from './PriceTable.style';
import NOTICE from '../../assets/notice.svg';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';
import { ReactNode } from 'react';

type PriceTableProps = {
  name: string;
  price: number;
  upperDivider?: boolean;
};

const PriceTableRow = ({ name, price, upperDivider }: PriceTableProps) => {
  return (
    <>
      {upperDivider && <Divider />}
      <ContentRow title={name} content={`${price.toLocaleString('ko-kr')}원`} />
    </>
  );
};

const PriceTableMain = ({ children }: { children: ReactNode }) => {
  return (
    <S.Container>
      <S.NoticeContainer>
        <ImageBox src={NOTICE} width={16} height={16} border="none" />
        <Text size="s" weight="m">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </S.NoticeContainer>
      <Divider />
      <S.Rows>{children}</S.Rows>
    </S.Container>
  );
};

export const PriceTable = Object.assign(PriceTableMain, {
  Row: PriceTableRow,
});
