import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetArticleResults, Article } from "../types";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import BannerImage from "../public/book.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
const client = new ApolloClient({
  uri: "https://gql-technical-assignment.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const imgUrl =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";

const Home: NextPage = ({ articles }: any) => {
  const [isDarkMode, setDarkMode] = useState(true);
  const [articlesLoaded, setArticlesLoaded] = useState(
    articles.retrievePageArticles
  );
  const [nav, setNav] = useState(false);
  const [page, setPage] = useState(1);

  const handleClick = () => setNav(!nav);

  const getMoreArticles = async () => {
    const { data }: GetArticleResults = await client.query({
      query: gql`
        query {
          retrievePageArticles(page: 2) {
            id
            author
            createdAt
            score
            updatedAt
            title
            text
            type
            url
          }
        }
      `,
    });
    const newArticles = data;

    setArticlesLoaded((articles) => [
      ...articles,
      ...newArticles.retrievePageArticles,
    ]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    getMoreArticles();
  }, []);

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
        {articlesLoaded.map((article: Article) => {
          return (
            <Card
              title={article.title}
              text={article.text}
              author={article.author}
              imgUrl={imgUrl}
              light={isDarkMode}
              url={article.url}
            />
          );
        })}
      </Page>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data }: GetArticleResults = await client.query({
    query: gql`
      query {
        retrievePageArticles(page: 1) {
          id
          author
          createdAt
          score
          updatedAt
          title
          text
          type
          url
        }
      }
    `,
  });

  return {
    props: {
      articles: data,
    },
  };
};

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
