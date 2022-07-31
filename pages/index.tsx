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
import ArticleList from "../components/ArticleList";
import InfiniteList from "../components/InfiniteList";

const imgUrl =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";

const Home: NextPage = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const [articlesLoaded, setArticlesLoaded] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const [nav, setNav] = useState(false);

  //loads data from graphql
  const { loading, error, fetchMore } = useQuery(GET_FIRST_ARTICLES, {
    onCompleted: (data) => {
      if (!articlesLoaded.length) {
        console.log(data.firstPageArticles);
        setArticlesLoaded(data.firstPageArticles);
      }
    },
  });

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
        <BannerContainer nav={nav}>
          <Banner light={isDarkMode}>
            <BannerText light={isDarkMode}>Read Every Article</BannerText>
          </Banner>
          <ImageContainer nav={nav}>
            <Image alt="banner" src={BannerImage} width={550} height={500} />
          </ImageContainer>
        </BannerContainer>
        {articlesLoaded && (
          <ArticleList articles={articlesLoaded} isDarkMode={isDarkMode} />
        )}
        {articlesLoaded && <InfiniteList isDarkMode={isDarkMode} />}
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
  @media (max-width: 750px) {
    padding: 50px;
  }
`;

const H1 = styled.h1<{ light: boolean }>`
  font-size: 3rem;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
  width: 100vh;
  @media (max-width: 750px) {
    font-size: 2rem;
  }
`;

const BannerContainer = styled.div<{ nav: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 750px) {
    flex-direction: column;
    width: 80%;
  }
`;
const Banner = styled.div<{ light: boolean }>`
  height: 500px;
  width: 100%;
  background-color: ${(props) => (props.light ? "#b7c7c9" : "#333")};
  font-size: 25rem;
`;
const BannerText = styled.p<{ light: boolean }>`
  font-size: 8rem;
  color: ${(props) => (!props.light ? "#eee" : "#8c778c")};
  @media (max-width: 750px) {
    font-size: 4rem;
    text-align: center;
  }
`;

const ImageContainer = styled.div<{ nav: boolean }>`
  display: ${(props) => (props.nav ? "none" : "flex")};
`;
