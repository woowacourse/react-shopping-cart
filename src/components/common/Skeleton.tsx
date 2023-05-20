import { styled } from 'styled-components';

export const Skeleton = () => {
  return (
    <Style.Skeleton>
      <Style.Image />
      <div>
        <Style.Text />
        <Style.Text />
      </div>
    </Style.Skeleton>
  );
};

const StyledSkeleton = styled.div`
  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: skeleton-animation 5s infinite ease-out;
  border-radius: 8px;
`;

const Style = {
  Skeleton: styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 500px) {
      margin-bottom: 45px;
    }
  `,

  Image: styled(StyledSkeleton)`
    width: 282px;
    height: 282px;

    margin-bottom: 10px;
  `,

  Text: styled(StyledSkeleton)`
    width: 160px;
    height: 25px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  `,
};
