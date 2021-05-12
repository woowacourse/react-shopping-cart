const request = async ({ path, body, method, returnType }) => {
  const response = await fetch(`http://localhost:4000/${path}`, fetchOptions({ method, body }));

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (returnType) {
    return await response[returnType]();
  }
};

const fetchOptions = ({ method, body }) => ({
  method,
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  body: body && JSON.stringify(body),
});

export const httpClient = {
  get: ({ path, returnType }) => request({ path, method: 'GET', returnType }),
  post: ({ path, body, returnType }) => request({ path, body, method: 'POST', returnType }),
  delete: ({ path, body, returnType }) => request({ path, body, method: 'DELETE', returnType }),
};
