export const handleResponseError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
};

type MutateMethod = 'POST' | 'PATCH' | 'DELETE';

export const getData = async <D = any>(
  url: string,
  param?: string
): Promise<D> => {
  const fetchUrl = param ? `${url}/${param}` : url;

  const response = await fetch(fetchUrl, {
    method: 'GET',
  });

  handleResponseError(response);

  const data: D = await response.json();

  return data;
};

interface MutateData<B> {
  url: string;
  method: MutateMethod;
  param?: string | number;
  body?: B;
}

export const mutateData = async <B extends {} = {}>({
  url,
  method,
  param,
  body,
}: MutateData<B>) => {
  const fetchUrl = param ? `${url}/${param}` : url;

  const response = await fetch(fetchUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  handleResponseError(response);
};
