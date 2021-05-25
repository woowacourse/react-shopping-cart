const BASE_URL = 'https://shopping-cart.techcourse.co.kr';

const requestTable = {
  GET: async (query: string) => (await fetch(`${BASE_URL}${query}`)).json(),

  POST: async <T>(query: string, payload: T) =>
    fetch(`${BASE_URL}${query}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }),

  DELETE: async (query: string) =>
    fetch(`${BASE_URL}${query}`, {
      method: 'DELETE',
    }),
};

export { requestTable };
