import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Blog</title>
        <meta name="Blos-Assessment" content="Blog-site" />
        <link rel="icon" href="/article.ico" />
      </Head>
      <h2>Welcome to the blog site</h2>
    </div>
  );
};

export default Home;
