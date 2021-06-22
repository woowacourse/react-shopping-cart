const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getHeadersWithAccessToken = (accessToken) => {
  if (!accessToken) {
    return defaultHeaders;
  }

  return {
    ...defaultHeaders,
    Authorization: `Bearer ${accessToken}`,
  };
};

export const requestGet = async ({ url, accessToken }) => {
  const headers = getHeadersWithAccessToken(accessToken);
  const response = await fetch(url, {
    headers,
  });

  return response;
};

export const requestPost = async ({ url, body, accessToken }) => {
  const headers = getHeadersWithAccessToken(accessToken);
  const serializedBody = typeof body === 'object' ? JSON.stringify(body) : body;
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: serializedBody,
  });

  return response;
};

export const requestDelete = async ({ url, accessToken }) => {
  const headers = getHeadersWithAccessToken(accessToken);
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  return response;
};
