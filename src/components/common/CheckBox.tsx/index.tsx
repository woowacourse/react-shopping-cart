import React from 'react';
import styled from 'styled-components';
import { CheckBoxProps } from '@/components/common/MultiSelector/CheckBox';

const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	width: 28px;
	height: 28px;
	border: 2px solid #22a6a2;
	border-radius: 5px;
	position: relative;
	outline: none;
	cursor: pointer;

	&:checked {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-color: limegreen;
	}
`;

const CheckBox: React.FC = (props?: CheckBoxProps) => {
	return <StyledCheckBox {...props} />;
};

export default CheckBox;
