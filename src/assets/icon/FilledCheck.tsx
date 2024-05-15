interface FilledCheckProps {
  color: string;
}

const FilledCheck = ({ color }: FilledCheckProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        border: "inherit",
        borderRadius: "inherit",
        boxSizing: "content-box",
      }}
    >
      <g clip-path="url(#clip0_4873_53)">
        <path
          d="M9.1157 16.17L4.9457 12L3.5257 13.41L9.1157 19L21.1157 7L19.7057 5.59L9.1157 16.17Z"
          fill={color}
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
  );
};

export default FilledCheck;
