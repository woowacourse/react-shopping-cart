import { useRecoilState } from 'recoil';
import CheckedButtonIcon from '../../assets/CheckedButtonIcon.png';
import UnCheckedButtonIcon from '../../assets/UncheckedButtonIcon.png';
import { Button } from '../common/button/Button';
import { isLandAndMoutainAreaCheckedState } from '../../recoil/atoms/atoms';
import {
  StyledIslandAndMountainAreaCheckWrapper,
  StyledIslandAndMountainAreaDescription,
  StyledIslandAndMountainAreaSection,
  StyledIslandAndMountainAreaTitle,
} from './IslandAndMountainAreaCheckSection.styled';

export const IslandAndMountainAreaCheckSection = () => {
  const [isLandAndMoutainAreaChecked, setIsLandAndMoutainAreaChecked] =
    useRecoilState(isLandAndMoutainAreaCheckedState);

  return (
    <StyledIslandAndMountainAreaSection>
      <StyledIslandAndMountainAreaTitle>
        배송 정보
      </StyledIslandAndMountainAreaTitle>
      <StyledIslandAndMountainAreaCheckWrapper>
        <Button
          onClick={() =>
            setIsLandAndMoutainAreaChecked(!isLandAndMoutainAreaChecked)
          }
          clicked={isLandAndMoutainAreaChecked}
          iconSrc={
            isLandAndMoutainAreaChecked
              ? CheckedButtonIcon
              : UnCheckedButtonIcon
          }
        />
        <StyledIslandAndMountainAreaDescription>
          제주도 및 도서 산간 지역
        </StyledIslandAndMountainAreaDescription>
      </StyledIslandAndMountainAreaCheckWrapper>
    </StyledIslandAndMountainAreaSection>
  );
};
