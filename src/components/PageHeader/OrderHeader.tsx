import { Title, SubTitle, PageHeaderStyle } from './PageHeader.style';

interface Props {
  category: number;
  count: number;
}

export default function OrderHeader({ category, count }: Props) {
  return (
    <PageHeaderStyle>
      <Title>주문 확인</Title>
      <SubTitle>
        총 {category}종류의 상품 {count}개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </SubTitle>
    </PageHeaderStyle>
  );
}
