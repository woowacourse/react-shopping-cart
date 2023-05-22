import React, { PropsWithChildren, useContext } from 'react';
import CheckBox, {
	CheckBoxProps,
} from '@/components/common/MultiSelector/CheckBox';
import Label, { LabelProps } from '@/components/common/MultiSelector/Label';
import CheckBoxForAll, {
	CheckBoxForAllProps,
} from '@/components/common/MultiSelector/CheckBoxForAll';

interface MultiSelectorComposition {
	CheckBox: React.FC<PropsWithChildren<CheckBoxProps>>;
	Label: React.FC<PropsWithChildren<LabelProps>>;
	CheckBoxForAll: React.FC<PropsWithChildren<CheckBoxForAllProps>>;
}

interface MultiSelectorProps {
	options: Record<string, boolean>;
	checkOptions: (v: Record<string, boolean>) => void;
}

interface MultiSelectorContextProps {
	isSelected: (key: string) => boolean;
	setSelected: (key: string, selected: boolean) => void;
	selectAllOptions: () => void;
	cancelSelectAllOptions: () => void;
}

const MultiSelectorContext =
	React.createContext<MultiSelectorContextProps | null>(null);

export const useMultiSelectorContext = () => {
	const multiSelectorState = useContext(MultiSelectorContext);
	if (multiSelectorState === null)
		throw new Error('MultiSelectorContext가 존재하지 않습니다.');

	return multiSelectorState;
};

const MultiSelector: React.FC<PropsWithChildren<MultiSelectorProps>> &
	MultiSelectorComposition = ({ children, options, checkOptions }) => {
	const isSelected = (key: string) => {
		return options[key];
	};

	const setSelected = (key: string, selected: boolean) => {
		const copyOptions = { ...options };

		if (selected) {
			copyOptions[key] = true;
		} else {
			copyOptions[key] = false;
		}

		checkOptions(copyOptions);
	};

	const selectAllOptions = () => {
		const copyOptions = { ...options };

		Object.keys(copyOptions).forEach((option) => {
			copyOptions[option] = true;
		});

		checkOptions(copyOptions);
	};

	const cancelSelectAllOptions = () => {
		const copyOptions = { ...options };

		Object.keys(copyOptions).forEach((option) => {
			copyOptions[option] = false;
		});

		checkOptions(copyOptions);
	};

	return (
		<MultiSelectorContext.Provider
			value={{
				isSelected,
				setSelected,
				selectAllOptions,
				cancelSelectAllOptions,
			}}
		>
			{children}
		</MultiSelectorContext.Provider>
	);
};

MultiSelector.CheckBox = CheckBox;
MultiSelector.Label = Label;
MultiSelector.CheckBoxForAll = CheckBoxForAll;

export default MultiSelector;
