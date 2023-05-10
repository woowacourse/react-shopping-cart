import mockData from '../assets/mockData.json';
interface Response {
  data: string;
}

export const fetchMockProductList = () => {
  return new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: JSON.stringify(mockData),
        }),
      1000
    )
  );
};
