import styled from "@emotion/styled";

export const ButtonSize = {
  X_SMALL: "X_SMALL",
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
  X_LARGE: "X_LARGE",
} as const;

const ButtonStyles = {
  [ButtonSize.X_SMALL]: {},
  [ButtonSize.SMALL]: {},
  [ButtonSize.MEDIUM]: {},
  [ButtonSize.LARGE]: {},
  [ButtonSize.X_LARGE]: {},
};

const IconStyles = {
  [ButtonSize.X_SMALL]: {},
  [ButtonSize.SMALL]: {},
  [ButtonSize.MEDIUM]: {},
  [ButtonSize.LARGE]: {},
  [ButtonSize.X_LARGE]: {},
};

export const Container = styled.button<{
  size: typeof ButtonSize[keyof typeof ButtonSize];
  buttonColor?: string;
  disabled: boolean;
  primaryColor: string;
  disabledColor: string;
}>`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  background-color: ${(props) =>
    props.disabled
      ? props.buttonColor || props.primaryColor
      : props.disabledColor};

  ${({ size }) => ButtonStyles[size] || ButtonStyles.MEDIUM};
  &:hover {
    opacity: 0.7;
  }
`;

export const Icon = styled.img<{
  size: typeof ButtonSize[keyof typeof ButtonSize];
  hasText: boolean;
}>`
  ${({ size }) => IconStyles[size] || IconStyles.MEDIUM};
  margin-right: ${({ hasText }) => (hasText ? "1.5em" : 0)};
`;
