import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Article } from "../types";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import BannerImage from "../public/book.jpg";
import { GET_ARTICLES } from "../graphql/queries/articles";
import InfiniteScroll from "react-infinite-scroll-component";
//stock image url
const imgUrl =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";

const Home: NextPage = () => {
  const [isDarkMode, setDarkMode] = useState(true);
  const [articlesLoaded, setArticlesLoaded] = useState<
    Array<{ key: string; value: string }>
  >([]);
  const [nav, setNav] = useState(false);
  const [page, setPage] = useState(1);

  const { loading, error, fetchMore } = useQuery(GET_ARTICLES, {
    variables: { page: page },
    onCompleted: (data) => {
      if (!articlesLoaded.length) {
        setArticlesLoaded(data.retrievePageArticles);
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

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
            <Image
              responsive="750w"
              src={BannerImage}
              width={550}
              height={500}
            />
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
            {articlesLoaded.map((article: Article) => {
              return (
                <Card
                  key={article.id}
                  title={article.title}
                  text={article.text}
                  author={article.author}
                  imgUrl={imgUrl}
                  light={isDarkMode}
                  url={article.url}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </Page>
    </>
  );
};

export default Home;

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
