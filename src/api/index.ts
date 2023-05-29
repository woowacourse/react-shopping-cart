import { FETCH } from "../abstract/constants";

export const fetchGetQuery = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error(FETCH.GET);
  }

  const data = await response.json();
  return data;
};

export const fetchPostQuery = async <T>(
  url: string,
  bodyData: Record<string, number>
): Promise<T> => {
  const response = await fetch(url, {
    method: FETCH.POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (response.status !== 201) {
    throw new Error(FETCH.POST);
  }

  const data = await response.json();
  return data;
};

export const fetchPatchQuery = async (
  url: string,
  bodyData: Record<string, number>
) => {
  const response = await fetch(url, {
    method: FETCH.PATCH,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (response.status !== 200) {
    throw new Error(FETCH.PATCH);
  }
};

export const fetchDeleteQuery = async (url: string) => {
  const response = await fetch(url, {
    method: FETCH.DELETE,
  });

  if (response.status !== 204) {
    throw new Error(FETCH.DELETE);
  }
};
