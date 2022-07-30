import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = ({
  isDarkMode,
  setDarkMode,
}: {
  isDarkMode: boolean;
  setDarkMode: any;
}) => {
  const handleToggle = () => {
    setDarkMode(!isDarkMode);
  };
  return (
    <Container light={isDarkMode}>
      <H1 light={isDarkMode}>Welcome to the blog site</H1>
      <StyledLink light={isDarkMode} href="/">
        Add New Post
      </StyledLink>
      <Toggle light={isDarkMode} onClick={handleToggle}>
        {!isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
      </Toggle>
    </Container>
  );
};

export default NavBar;

const H1 = styled.h1<{ light: boolean }>`
  font-size: 2rem;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Container = styled.div<{ light: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 50px;
  align-items: center;
  place-items: center;
`;

const Toggle = styled.button<{ light: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  background: none;
  color: ${(props) => (!props.light ? "#eee" : "#333")};
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: red;
`;

const StyledLink = styled.a<{ light: boolean }>`
  color: ${(props) => (!props.light ? "#eee" : "#333")};
  font-weight: bold;
  padding-right: 300px;
`;
