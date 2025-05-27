import { InfoText, Table } from "./Receipt.styles";

function Receipt() {
  return (
    <>
      <div css={InfoText}>
        <img src="public/info.svg" alt="info 아이콘" />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>
      <table css={Table}>
        <tbody>
          <tr>
            <td>주문 금액</td>
            <td>70,000원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>3,000원</td>
          </tr>
          <tr>
            <td>총 결제 금액</td>
            <td>73,000원</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Receipt;
