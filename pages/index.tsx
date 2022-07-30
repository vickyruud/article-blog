import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetArticleResults, Article } from "../types";
import { useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import BannerImage from "../public/book.jpg";

const imgUrl =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";

const Home: NextPage = ({ articles }: any) => {
  const [isDarkMode, setDarkMode] = useState(true);

  const loaded = articles.retrievePageArticles;

  return (
    <>
      <Head>
        <title>Test Blog</title>
        <meta name="Blos-Assessment" content="Blog-site" />
        <link rel="icon" href="/article.ico" />
      </Head>
      <Page light={isDarkMode}>
        <NavBar isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        <BannerContainer>
          <Banner light={isDarkMode}>Test</Banner>
          <Image src={BannerImage} width={550} height={500} />
        </BannerContainer>

        {loaded.map((article: Article) => {
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
  const client = new ApolloClient({
    uri: "https://gql-technical-assignment.herokuapp.com/graphql",
    cache: new InMemoryCache(),
  });

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
  background-color: #b7c7c9;
  font-size: 25rem;
  color: ${(props) => (!props.light ? "#eee" : "#333")};
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
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
