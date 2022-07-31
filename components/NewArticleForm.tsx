import styled from "styled-components";

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: #775963;
  }
  width: 500px;
`;

const Form = styled.form`
  width: 100%;
`;

import React, { useState } from "react";
import { Button } from "./modal.styles";

const NewArticleForm = ({
  setArticles,
  light,
  hideModal,
}: {
  setArticles: any;
  light: boolean;
  hideModal: any;
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const newArticle = {
      title,
      text,
      url,
    };
    setArticles((prev: any) => [...prev, newArticle]);
    hideModal();
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <Input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Text"
        />
        <Input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="URL"
        />
        <Button type="submit" light={light}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewArticleForm;
