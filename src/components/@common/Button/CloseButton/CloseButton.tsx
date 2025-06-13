type CloseButtonProps = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      type="button"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
      >
        <path
          d="M14.4854 1.41L13.0754 0L7.48535 5.59L1.89535 0L0.485352 1.41L6.07535 7L0.485352 12.59L1.89535 14L7.48535 8.41L13.0754 14L14.4854 12.59L8.89535 7L14.4854 1.41Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
