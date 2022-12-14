import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  title,
  text,
  author,
  imgUrl,
  light,
  url,
}: {
  url: String;
  title: String;
  text: String;
  author: String;
  imgUrl: String;
  light: boolean;
}) => (
  <CardContainer light={light}>
    <ImageContainer>
      <Image alt={`${title}`} src={`${imgUrl}`} width="300" height="300" />
    </ImageContainer>
    <TextContainer>
      <Title light={light}>{title}</Title>
      <ArticleText light={light}>{text}</ArticleText>
      {url && (
        <StyledLink href={`${url}`} light={light}>
          Read the Article
        </StyledLink>
      )}
    </TextContainer>
  </CardContainer>
);
export default Card;

const CardContainer = styled.div<{ light: boolean }>`
  display: flex;
  flex-direction: row;
  border-top: 1px solid;
  border-color: ${(props) => (!props.light ? "#eee" : "#b0816e")};
  box-sizing: border-box;
  background: ${(props) => (props.light ? "#eee" : "#333")};
  min-width: 100%;
  margin-top: 25px;
  padding: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Title = styled.h2<{ light: boolean }>`
  color: ${(props) => (!props.light ? "#eee" : "#333")};
  font-weight: bold;
  margin-right: 10px;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const ImageContainer = styled.div`
  max-width: 400px;
  min-height: 400px;
  @media (max-width: 500px) {
    max-width: 200px;
    min-height: 200px;
  }
`;

const ArticleText = styled.p<{ light: boolean }>`
  color: ${(props) => (!props.light ? "#eee" : "#333")};
  margin-right: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  max-width: 500px;
`;

const StyledLink = styled.a<{ light: boolean }>`
  color: ${(props) => (!props.light ? "#eee" : "#333")};
  font-weight: bold;
`;
