import React from "react";
import Card from "./Card";

const imgUrl =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80";

const ArticleList = ({
  articles,
  isDarkMode,
}: {
  articles: any;
  isDarkMode: boolean;
}) => {
  const arrayOfCards = articles.map((article: any) => {
    return (
      article.title && (
        <Card
          key={article.id}
          title={article.title}
          text={article.text}
          author={article.author}
          imgUrl={imgUrl}
          light={isDarkMode}
          url={article.url}
        />
      )
    );
  });

  return arrayOfCards;
};

export default ArticleList;
