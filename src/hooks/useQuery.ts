import { useEffect, useState } from 'react';

export const useQuery = <T>(
	url: string,
	params?: RequestInit
): [T | null, boolean, boolean] => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const getApiData = async () => {
			setLoading(true);

			try {
				const response = await fetch(url, params);
				const fetchingData = await response.json();
				setData(fetchingData);
			} catch {
				setError(true);
			}

			setLoading(false);
		};

		getApiData();
	}, [url, params]);

	return [data, isLoading, isError];
};
