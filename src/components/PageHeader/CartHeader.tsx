import { Title, SubTitle, PageHeaderStyle } from './PageHeader.style';

export default function CartHeader({ count }: { count: number }) {
  return (
    <PageHeaderStyle>
      <Title>장바구니</Title>
      {count !== 0 && (
        <SubTitle>현재 {count}종류의 상품이 담겨있습니다.</SubTitle>
      )}
    </PageHeaderStyle>
  );
}
