import styled from '@emotion/styled';

type InlineNoticeProps = {
  text: string;
};

const InlineNotice = ({ text }: InlineNoticeProps) => {
  return (
    <S.container>
      <img src="./info.svg" />
      <p>{text}</p>
    </S.container>
  );
};

export default InlineNotice;

const S = {
  container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e6e6e6;
  `,
};
