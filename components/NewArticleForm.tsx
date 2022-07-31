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

import React, { useState } from "react";

const NewArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  return (
    <>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <Input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
      />
      <Input
        onChange={(e) => setUrl(e.target.value)}
        type="text"
        placeholder="URL"
      />
    </>
  );
};

export default NewArticleForm;
