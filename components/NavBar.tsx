import { useState } from "react";
import styled from "styled-components";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import ModalForm from "./ModalForm";
import { Button } from "./modal.styles";

const NavBar = ({
  isDarkMode,
  setDarkMode,
  handleClick,
  setNav,
  nav,
  articles,
  setArticles,
}: {
  isDarkMode: boolean;
  setDarkMode: any;
  handleClick: any;
  setNav: any;
  nav: boolean;
  articles: any;
  setArticles: any;
}) => {
  const handleToggle = () => {
    setDarkMode(!isDarkMode);
  };

  const [active, setActive] = useState(false);

  return (
    <RootContainer light={isDarkMode}>
      <Container light={isDarkMode}>
        <H1 light={isDarkMode}>Articulate - Read Interesting Articles</H1>
      </Container>
      <MenuContainer light={isDarkMode}>
        <Button light={isDarkMode} onClick={() => setActive(true)}>
          New Article
        </Button>
        <ModalForm
          light={isDarkMode}
          active={active}
          hideModal={() => setActive(false)}
          setArticles={setArticles}
        />

        <Toggle light={isDarkMode} onClick={handleToggle}>
          {!isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
        </Toggle>
      </MenuContainer>

      <HamburgerButton light={isDarkMode} onClick={handleClick}>
        {" "}
        {!nav ? <FaBars size={28} /> : <FaTimes size={28} />}
      </HamburgerButton>

      {nav && (
        <MobileRootContainer light={isDarkMode}>
          <MobileContainer light={isDarkMode}>
            <H1 light={isDarkMode}>Articulate - Read Interesting Articles</H1>
            <Button light={isDarkMode} onClick={() => setActive(true)}>
              New Article
            </Button>

            <ModalForm
              light={isDarkMode}
              active={active}
              hideModal={() => setActive(false)}
              setArticles={setArticles}
            >
              Click Me
            </ModalForm>
            <Toggle light={isDarkMode} onClick={handleToggle}>
              {!isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </Toggle>
          </MobileContainer>
        </MobileRootContainer>
      )}
    </RootContainer>
  );
};

export default NavBar;

const H1 = styled.h1<{ light: boolean }>`
  font-size: 2rem;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
  @media (max-width: 750px) {
    font-size: 1rem;
  }
`;

const RootContainer = styled.div<{ light: boolean }>`
  display: flex;
  justify-content: space-between;
  height: 25px;
  margin-top: 25px;
  padding-bottom: 10px;
`;

const Container = styled.div<{ light: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 25px;
  padding-left: 25px;
  margin: 5px;
  align-items: center;
  place-items: center;
  @media (max-width: 750px) {
    display: none;
  }
`;

const Toggle = styled.button<{ light: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  background: none;
  color: ${(props) => (!props.light ? "#eee" : "#333")};
`;

const MenuContainer = styled.div<{ light: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;
  @media (max-width: 750px) {
    display: none;
  }
`;


const HamburgerButton = styled.button<{ light: boolean }>`
  display: none;

  @media (max-width: 750px) {
    display: flex;
    background-color: ${(props) => (props.light ? "#eee" : "#333")};
    color: ${(props) => (!props.light ? "#eee" : "#333")};
    position: absolute;
    right: 0px;
    top: 0px;
    margin-top: 5px;
    border: none;
    margin-bottom: 8px;
    margin-top: 8px;

    overflow-y: hidden;
  }
`;

const MobileRootContainer = styled.div<{ light: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const MobileContainer = styled.div<{ light: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  background-color: ${(props) => (props.light ? "#eee" : "#333")};
  align-items: center;
  position: absolute;
  margin-top: 5px;
  border: none;
  overflow: hidden;
`;
