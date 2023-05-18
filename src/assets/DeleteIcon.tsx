interface DeleteIconProps {
  handleClick: () => void;
}

export const DeleteIcon = ({ handleClick }: DeleteIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H24V24H0V0Z" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          {/* <use xlink:href="#image0_2_205" transform="scale(0.025)" /> */}
        </pattern>
        {/* <image id="image0_2_205" width="40" height="40" /> */}
      </defs>
    </svg>
  );
};
