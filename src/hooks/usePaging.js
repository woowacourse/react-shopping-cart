import { useState } from 'react';

export default ({ initPageIndex, contents, contentsPerPage }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initPageIndex);
  const displayContents = contents.slice(currentPageIndex * contentsPerPage, (currentPageIndex + 1) * contentsPerPage);
  const maxPageIndex = Math.ceil(contents.length / contentsPerPage) - 1;

  const onClickNext = () => {
    setCurrentPageIndex(prevIndex => (prevIndex === maxPageIndex ? prevIndex : prevIndex + 1));
  };

  const onClickPrev = () => {
    setCurrentPageIndex(prevIndex => (prevIndex < 1 ? 0 : prevIndex - 1));
  };

  return { currentPageIndex, onClickNext, onClickPrev, displayContents, maxPageIndex };
};
