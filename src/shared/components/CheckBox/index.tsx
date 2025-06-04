import { ComponentProps } from 'react';

export type CheckBoxProps = {
  /**
   * Determines if the checkbox is checked.
   * @default false
   */
  checked?: boolean;
} & ComponentProps<'svg'>;

export const CheckBox = ({ checked = true, ...props }: CheckBoxProps) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.615723"
        y="0.5"
        width="23"
        height="23"
        rx="7.5"
        fill={checked ? '#000000' : '#ffffff'}
        stroke={checked ? '#000000' : '#cccccc'}
      />
      <g clipPath="url(#clip0_6117_34)">
        <path
          d="M9.11573 16.17L4.94573 12L3.52573 13.41L9.11573 19L21.1157 7L19.7057 5.59L9.11573 16.17Z"
          fill={checked ? '#ffffff' : '#cccccc'}
        />
      </g>
      <defs>
        <clipPath id="clip0_6117_34">
          <rect width="24" height="24" fill="white" transform="translate(0.115723)" />
        </clipPath>
      </defs>
    </svg>
  );
};
