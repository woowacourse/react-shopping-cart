import { useEffect, useState } from 'react';
import { ERROR_CODE } from '../constant/error';

export const useQuery = <T>(url: string, params?: RequestInit) => {
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const getApiData = async () => {
			setLoading(true);

			try {
				const response = await fetch(url, params);
				if (!response.ok) {
					throw new Error(`${ERROR_CODE[response.status]}`);
				}
				const fetchingData = await response.json();

				setData(fetchingData);
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
					setData(null);
				}
			} finally {
				setLoading(false);
			}
		};

		getApiData();
	}, [url, params]);

	return { data, isLoading, errorMessage };
};
