import styled from "@emotion/styled";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #fafafa;
  margin: 100px 0 -90px 0;
  padding: 20px;

  .footer__info {
    display: flex;
    justify-content: center;
    flex-direction: column;

    .footer__info__description {
      margin-bottom: 3px;
    }

    .footer__info__caution {
      margin-top: 20px;
    }
  }
`;

export default StyledFooter;
