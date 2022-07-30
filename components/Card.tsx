import React from "react";
import styled from "styled-components";
import Image from "next/image";

const CardContainer = styled.div<{ light: boolean }>`
  display: flex;
  flex-direction: row;
  border-top: 5px solid;
  border-width: thin;
  border-color: ${(props) => (!props.light ? "#eee" : "#333")};
  box-sizing: border-box;
  background: ${(props) => (props.light ? "#eee" : "#333")};
  min-width: 100%;
  margin: 25px;
  padding: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Title = styled.h2<{ light: boolean }>`
  color: ${(props) => (!props.light ? "#eee" : "#333")};
  font-weight: bold;
  padding-left: 20px;
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

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid;
`;

const Card = ({
  title,
  text,
  author,
  imgUrl,
  light,
}: {
  title: String;
  text: String;
  author: String;
  imgUrl: String;
  light: boolean;
}) => (
  <CardContainer light={light}>
    <ImageContainer>
      <StyledImg src={imgUrl} />
    </ImageContainer>
    <Title light={light}>{title}</Title>
  </CardContainer>
);
export default Card;
