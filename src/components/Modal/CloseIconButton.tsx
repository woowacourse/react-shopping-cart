import styled from '@emotion/styled';

type CloseIconButtonProps = React.SVGProps<SVGSVGElement>;

const CloseIconButton = ({ 'aria-label': ariaLabel = '닫기', ...props }: CloseIconButtonProps) => {
  return (
    <StyledSVG
      {...props}
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none">
      <g clipPath="url(#clip0_1_291)">
        <path
          d="M19.8167 6.41L18.4067 5L12.8167 10.59L7.22665 5L5.81665 6.41L11.4067 12L5.81665 17.59L7.22665 19L12.8167 13.41L18.4067 19L19.8167 17.59L14.2267 12L19.8167 6.41Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_291">
          <rect width="24" height="24" fill="white" transform="translate(0.81665)" />
        </clipPath>
      </defs>
    </StyledSVG>
  );
};

export default CloseIconButton;

const StyledSVG = styled.svg`
  cursor: pointer;
  position: absolute;
  top: 22px;
  right: 22px;
  border-radius: 50%;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #8b95a1;
  }
`;
