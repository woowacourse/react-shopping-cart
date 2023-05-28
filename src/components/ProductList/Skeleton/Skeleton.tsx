import * as styled from './Skeleton.styled';

export const Skeleton = () => {
  return (
    <styled.Skeleton>
      <styled.Image />
      <styled.Info>
        <styled.Text />
        <styled.Text />
      </styled.Info>
    </styled.Skeleton>
  );
};
