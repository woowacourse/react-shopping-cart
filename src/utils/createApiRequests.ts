interface FetchParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

export const createApiRequests = (baseUrl: string) => (resourcePath: string) => {
  const endpoint = `${baseUrl}/${resourcePath}`;

  return {
    GET: (pathParameter?: string) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'GET',
      });
    },

    POST: ({ pathParameter, body }: { pathParameter?: string; body?: unknown }) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'POST',
        body,
      });
    },

    PATCH: ({ pathParameter, body }: { pathParameter?: string; body?: unknown }) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'PATCH',
        body,
      });
    },

    DELETE: (pathParameter?: string) => {
      return fetchRequest({
        endpoint: `${endpoint}${pathParameter ? `/${pathParameter}` : ''}`,
        method: 'DELETE',
      });
    },
  };
};

const fetchRequest = async ({ endpoint, method, body }: FetchParams) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Fetch Error: ${response.statusText}`);
    }

    if (method !== 'DELETE') {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Fetch Utility Error: ${error}`);
    throw error;
  }
};
