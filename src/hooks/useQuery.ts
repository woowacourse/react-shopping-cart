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
					setErrorMessage(ERROR_CODE[response.status]);
					setData(null);
				}
				const fetchingData = await response.json();

				setData(fetchingData);
			} finally {
				setLoading(false);
			}
		};

		getApiData();
	}, [url, params]);

	return { data, isLoading, errorMessage };
};
