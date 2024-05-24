interface FilledCheckProps {
  onClick?: () => void;
}

const FilledCheck = ({ onClick }: FilledCheckProps) => {
  return (
    <div onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          backgroundColor: "black",
          width: "24px",
          height: "24px",
          border: "inherit",
          borderRadius: "6px",
          boxSizing: "content-box",
        }}
      >
        <g clipPath="url(#clip0_4873_53)">
          <path
            d="M9.1157 16.17L4.9457 12L3.5257 13.41L9.1157 19L21.1157 7L19.7057 5.59L9.1157 16.17Z"
            fill={"white"}
          />
        </g>
        <defs>
          <clipPath id="clip0_4873_53">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.115723)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default FilledCheck;
