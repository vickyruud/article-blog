import React, { useState } from "react";
import { GET_MORE_ARTICLES } from "../graphql/queries/articles";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleList from "../components/ArticleList";

const InfiniteList = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [infiniteArticles, setInfiniteArticles] = useState<
    Array<{ key: string; value: string }>
  >([]);
  const [page, setPage] = useState(1);

  //loads data from graphql
  const { loading, error, fetchMore } = useQuery(GET_MORE_ARTICLES, {
    variables: { page: page },
    onCompleted: (data) => {
      if (!infiniteArticles.length) {
        setInfiniteArticles(data.retrievePageArticles);
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  //retrives more articles
  const getMoreArticles = async () => {
    const { data } = await fetchMore({
      variables: { page: page },
    });

    data.retrievePageArticles.forEach((element: any) => {
      setInfiniteArticles((prevArticles) => [...prevArticles, element]);
    });

    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {" "}
      {infiniteArticles && (
        <InfiniteScroll
          dataLength={infiniteArticles.length}
          next={getMoreArticles}
          pullDownToRefreshThreshold={50}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all</b>
            </p>
          }
        >
          <ArticleList articles={infiniteArticles} isDarkMode={isDarkMode} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default InfiniteList;
