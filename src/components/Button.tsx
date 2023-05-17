import React from 'react';
import styled from 'styled-components';

export type ButtonProps = {
	width: string;
	height: string;
};

const StyledButton = styled.button<ButtonProps>`
	width: 50px;
	height: 50px;

	width: ${(props) => props.width};
	height: ${(props) => props.height};
`;

const Button = (args: ButtonProps) => {
	return <StyledButton {...args}>button</StyledButton>;
};

export default Button;
