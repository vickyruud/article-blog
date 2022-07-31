import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import BannerImage from "../public/book.jpg";
import {
  GET_MORE_ARTICLES,
  GET_FIRST_ARTICLES,
} from "../graphql/queries/articles";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleList from "../components/ArticleList";

const Home: NextPage = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const [articlesLoaded, setArticlesLoaded] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const [nav, setNav] = useState(false);

  const [page, setPage] = useState(0);

  //loads data from graphql
  const { loading, error, fetchMore } = useQuery(GET_MORE_ARTICLES, {
    variables: { page: page },
    onCompleted: (data) => {
      if (!articlesLoaded.length) {
        setArticlesLoaded(data.retrievePageArticles);
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
      setArticlesLoaded((prevArticles) => [...prevArticles, element]);
    });

    setPage((prevPage) => prevPage + 1);
  };

  const handleClick = () => setNav(!nav);

  return (
    <>
      <Head>
        <title>Article Reader</title>
        <meta name="Blos-Assessment" content="Blog-site" />
        <link rel="icon" href="/article.ico" />
      </Head>
      <Page light={isDarkMode}>
        <NavBar
          nav={nav}
          setNav={setNav}
          handleClick={handleClick}
          isDarkMode={isDarkMode}
          setDarkMode={setDarkMode}
          articles={articlesLoaded}
          setArticles={setArticlesLoaded}
        />
        {!nav && (
          <BannerContainer>
            <Banner light={isDarkMode}>Test</Banner>
            <Image src={BannerImage} width={550} height={500} />
          </BannerContainer>
        )}
        {articlesLoaded && (
          <InfiniteScroll
            dataLength={articlesLoaded.length}
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
            <ArticleList articles={articlesLoaded} isDarkMode={isDarkMode} />
          </InfiniteScroll>
        )}
      </Page>
    </>
  );
};

export default Home;

const Page = styled.div<{ light: boolean }>`
  display: flex;
  position: static;
  overflow-x: hidden;
  flex-direction: column;
  background-color: ${(props) => (props.light ? "#eee" : "#333")};
  width: 100vw;
`;

const H1 = styled.h1<{ light: boolean }>`
  font-size: 3rem;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
  width: 100vh;
  @media (max-width: 750px) {
    font-size: 2rem;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const Banner = styled.div<{ light: boolean }>`
  height: 500px;
  width: 100%;
  background-color: ${(props) => (props.light ? "#b7c7c9" : "#333")};

  font-size: 25rem;
  color: ${(props) => (!props.light ? "#eee" : "#8c778c")};
  @media (max-width: 750px) {
    font-size: 8rem;
  }
`;
