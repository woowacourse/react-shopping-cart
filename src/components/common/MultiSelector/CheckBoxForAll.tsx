import React, { PropsWithChildren, useState } from 'react';
import { useMultiSelectorContext } from '@/components/common/MultiSelector';
import { getCustomChildren } from '@/components/common/utilsForCommon/getCustomChildren';

export interface CheckBoxForAllProps {
	isCustom?: boolean;
	value: string;
}

const CheckBoxForAll: React.FC<PropsWithChildren<CheckBoxForAllProps>> = ({
	children,
	value,
	isCustom,
}) => {
	const { selectAllOptions, cancelSelectAllOptions } =
		useMultiSelectorContext();
	const [isChecked, setIsChecked] = useState(false);

	const selectAllEvent = () => {
		if (!isChecked) {
			selectAllOptions();
			setIsChecked(true);
			return;
		}

		cancelSelectAllOptions();
		setIsChecked(false);
	};

	return isCustom ? (
		getCustomChildren(children, { onChange: selectAllEvent })
	) : (
		<input
			id={value}
			type="checkbox"
			checked={isChecked}
			onChange={selectAllEvent}
		/>
	);
};

export default CheckBoxForAll;
