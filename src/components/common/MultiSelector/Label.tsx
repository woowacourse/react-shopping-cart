import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface LabelProps {
	htmlFor: string;
}

const StyledSelectorLabel = styled.label`
	line-height: 20px;
	letter-spacing: 0.5px;
	color: #333333;
`;

const Label: React.FC<PropsWithChildren<LabelProps>> = ({
	children,
	htmlFor,
}) => {
	return (
		<StyledSelectorLabel htmlFor={htmlFor}>{children}</StyledSelectorLabel>
	);
};

export default Label;
