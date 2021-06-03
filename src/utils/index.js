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
