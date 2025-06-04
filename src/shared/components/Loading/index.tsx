import { StyledSpinner } from './Loading.styled';

export type LoadingProps = {
  /**
   * The size of the loading spinner
   * @type {string}
   * @description It can be a string (e.g. 'md')
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   *
   * @type {string}
   * @description It can be a string (e.g. 'black')
   * @default 'black'
   */
  color?: string;
};

export const Loading = ({ size = 'md', color = 'black', ...props }: LoadingProps) => {
  return (
    <StyledSpinner
      size={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 3C16.97 3 21 7.03 21 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSpinner>
  );
};
