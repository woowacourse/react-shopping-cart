import styled from '@emotion/styled';

const Root = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1.5px solid #cccccc;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-left: 15px;
  box-sizing: border-box;
  border-radius: 2px;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.div`
  margin-left: 20px;
  font-size: 20px;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
`;

const Detail = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.textColor.defaultGrey};
  letter-spacing: 0.5px;
`;

const ButtonWrapper = styled.div`
  margin-right: 25px;
`;

export default {
  Root,
  Image,
  Info,
  Title,
  Detail,
  ButtonWrapper,
};
