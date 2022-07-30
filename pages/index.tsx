import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetArticleResults, Article } from "../types";
import { useState } from "react";

const Home: NextPage = ({ articles }: any) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const handleToggle = () => {
    setDarkMode(!isDarkMode);
  };
  const loaded = articles.firstPageArticles;

  return (
    <Page light={isDarkMode ? true : false}>
      <Head>
        <title>Test Blog</title>
        <meta name="Blos-Assessment" content="Blog-site" />
        <link rel="icon" href="/article.ico" />
      </Head>
      <H1 light={isDarkMode ? true : false}>Welcome to the blog site</H1>
      <Toggle light={isDarkMode ? true : false} onClick={handleToggle}>
        Change Theme
      </Toggle>
      {loaded.map((article: Article) => {
        return (
          <Container light={isDarkMode ? true : false} key={article.id}>
            <Content light={isDarkMode ? true : false}>{article.title}</Content>
          </Container>
        );
      })}
    </Page>
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
        firstPageArticles {
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

const Page = styled("div")<{ light: boolean }>`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  transition: 0.5s;
  background: ${(props) => (props.light ? "#eee" : "#333")};
`;
const Toggle = styled("button")<{ light: boolean }>`
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  background: none;
  color: ${(props) => (!props.light ? "#eee" : "#333")};
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    transition: 0.2s all ease-in-out;
  }
`;
const H1 = styled("h1")<{ light: boolean }>`
  font-size: 3rem;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
`;

const Container = styled("div")<{ light: boolean }>`
  display: flex;
  border: 3px solid red;
  border-radius: 15px;
  justify-content: space-around;
  font-size: 5em;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
`;

const Content = styled("div")<{ light: boolean }>`
  align-self: center;
`;
