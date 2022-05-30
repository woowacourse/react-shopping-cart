import styled from 'styled-components';

export const PageBox = styled.div`
  width: 1200px;

  ${({ theme: { media } }) => media.sm`
  width: 100%;
`}

  ${({ theme: { media } }) => media.md`
  width: 100%;
`}
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const Subtitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

export const SectionsBox = styled.div`
  display: flex;
  justify-content: space-between;

  ${({ theme: { media } }) => media.sm`
  flex-direction: column;
`}

  ${({ theme: { media } }) => media.md`
  flex-direction: column;
`}
`;

export const LeftSection = styled.section`
  width: 60%;
  margin-top: 50px;

  ${({ theme: { media } }) => media.sm`
  width: 100%;
`}

  ${({ theme: { media } }) => media.md`
  width: 100%;
`}
`;

export const RightSection = styled.section`
  width: 35%;
  height: 260px;
  margin-top: 50px;

  border: 1px solid ${({ theme: { colors } }) => colors.gray};

  ${({ theme: { media } }) => media.sm`
  width: 100%;
`}
  ${({ theme: { media } }) => media.md`
  width: 100%;
`};
`;

export const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: items-center;
`;

export const SelectAllBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RemoveSelectedButtonBox = styled.div`
  padding: 12px 22px;
  border: 1px solid #bbbbbb;
`;

export const RightSectionTopBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 30px;
`;

export const TotalPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-top: 20px;
`;

export const HighlightedText = styled.span`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #2ac1bc;
    opacity: 0.5;
    z-index: ${({ theme: { zPriorities } }) => zPriorities.behind};
  }
`;

export const OrderButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 30px 0 30px;
`;
