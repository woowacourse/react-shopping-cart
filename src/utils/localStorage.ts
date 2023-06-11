export const getLocalData = (key: string) => {
	const data = window.localStorage.getItem(key);
	if (!data) return [];
	return JSON.parse(data);
};

export const setLocalData = (key: string, newData: object) => {
	window.localStorage.setItem(key, JSON.stringify(newData));
};
