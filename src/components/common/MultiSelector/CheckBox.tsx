import React, { ChangeEvent, PropsWithChildren } from 'react';
import { getCustomChildren } from '@/components/common/utilsForCommon/getCustomChildren';
import { useMultiSelectorContext } from '@/components/common/MultiSelector';

export interface CheckBoxProps {
	isCustom?: boolean;
	value: string;
}

const CheckBox: React.FC<PropsWithChildren<CheckBoxProps>> = ({
	children,
	value,
	isCustom,
}) => {
	const { isSelected, setSelected } = useMultiSelectorContext();

	const checked = isSelected(value);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelected(value, e.target.checked);
	};

	return isCustom ? (
		getCustomChildren(children, { id: value, checked, onChange })
	) : (
		<input id={value} type="checkbox" checked={checked} onChange={onChange} />
	);
};

export default CheckBox;
