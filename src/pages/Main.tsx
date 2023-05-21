import Header from "components/Header";
import Page from "components/common/Page";
import ItemList from "components/ItemList";
import React from "react";
import LoadingSpinner from "components/common/LodingSpinner";

const Main = () => {
  return (
    <>
      <Header />
      <Page>
        <React.Suspense fallback={<LoadingSpinner />}>
          <ItemList />
        </React.Suspense>
      </Page>
    </>
  );
};

export default Main;
