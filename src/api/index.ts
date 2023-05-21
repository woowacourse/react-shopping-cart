export const fetchGetQuery = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error("겟에러");
  }

  const data = await response.json();
  return data;
};

export const fetchPostQuery = async <T>(
  url: string,
  bodyData: Record<string, number>
): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (response.status !== 201) {
    throw new Error("포스트에러");
  }

  const data = await response.json();
  return data;
};

export const fetchPatchQuery = async <T>(
  url: string,
  bodyData: Record<string, number>
) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (response.status !== 200) {
    throw new Error("패치에러");
  }
};

export const fetchDeleteQuery = async <T>(url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (response.status !== 204) {
    throw new Error("삭제에러");
  }
};
