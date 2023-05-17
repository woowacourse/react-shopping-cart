import styled from 'styled-components';

export default function SubTotal() {
  return (
    <SubTotalContainer>
      <h3>결제예상금액</h3>
    </SubTotalContainer>
  );
}

const SubTotalContainer = styled.div`
  border: 1px solid #ddd;
`;
