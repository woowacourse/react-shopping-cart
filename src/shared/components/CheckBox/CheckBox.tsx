import { ComponentProps, useId } from 'react';

type CheckBoxProps = {
  id?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & ComponentProps<'input'>;

export const CheckBox = ({
  id: customId,
  checked = false,
  onChange,
  ...props
}: CheckBoxProps) => {
  const autoId = useId();
  const id = customId ?? autoId;

  return (
    <label
      htmlFor={id}
      style={{
        display: 'inline-block',
        position: 'relative',
        width: 23,
        height: 23,
        cursor: 'pointer',
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          margin: 0,
          cursor: 'pointer',
          zIndex: 1,
        }}
      />
      <svg
        width="23"
        height="23"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
        <path
          d="M9.11573 16.17L4.94573 12L3.52573 13.41L9.11573 19L21.1157 7L19.7057 5.59L9.11573 16.17Z"
          fill={checked ? '#ffffff' : '#cccccc'}
        />
      </svg>
    </label>
  );
};
