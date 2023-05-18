export const getData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorMessage = res.statusText;
    throw new Error(`에러가 발생했습니다. ${errorMessage}`);
  }

  return res.json();
};

export const postData = async <T>(url: string, data: T) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorMessage = res.statusText;
    throw new Error(`에러가 발생했습니다. ${errorMessage}`);
  }
};

export const patchData = async <T>(url: string, data: T) => {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorMessage = res.statusText;
    throw new Error(`에러가 발생했습니다. ${errorMessage}`);
  }
};

export const deleteData = async (url: string) => {
  const res = await fetch(url, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorMessage = res.statusText;
    throw new Error(`에러가 발생했습니다. ${errorMessage}`);
  }
};
