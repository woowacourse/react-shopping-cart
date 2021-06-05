export const formatPrice = price =>
  new Intl.NumberFormat('ko-KR').format(price);

export const chunckedArray = (data, chunkCount) => {
  const pageLength = Math.ceil(data.length / chunkCount);
  const pages = [...Array(pageLength).keys()];

  const chunk = [];

  pages.forEach(page => {
    chunk.push(data.slice(page * chunkCount, (page + 1) * chunkCount));
  });

  return chunk;
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomProducts = (data, length) => {
  const uniqueItems = new Set();

  while (uniqueItems.size < length) {
    const randomNum = randomNumber(1, data.length);
    let item = data.find(({ product_id }) => product_id === randomNum);

    if (item !== undefined) {
      uniqueItems.add(item);
    }
  }

  return [...uniqueItems];
};
