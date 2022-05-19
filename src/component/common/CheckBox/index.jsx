import styled from 'styled-components';

export default function CheckBox({ description, onCheckChange }) {
  return (
    <Wrapper>
      <Box type="checkbox" onChange={onCheckChange} />
      <Description>{description}</Description>
    </Wrapper>
  );
}

CheckBox.defaultProps = {
  description: '',
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Box = styled.input`
  width: 28px;
  height: 28px;
`;

const Description = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;

  color: #333333;
`;
