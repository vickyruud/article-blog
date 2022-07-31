import styled from "styled-components";

export const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
  @media (max-width: 750px) {
    padding: 50px;
  }
`;

export const ModalBody = styled.div`
  overflow-y: auto;
  padding: 30px 10px;
  position: relative;
  @media (max-width: 750px) {
    width: 70%;
  }
`;

export const ModalOverlay = styled.a<{ light: boolean }>`
  background: ${(props) => (props.light ? "#F7F8F9" : "#333")};
  bottom: 0;
  opacity: 0.75;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ModalClose = styled.a<{ light: boolean }>`
  float: right !important;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 1rem;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
`;

export const ModalContainer = styled.div<{ light: boolean }>`
  background-color: ${(props) => (props.light ? "#b7c7c9" : "#333")};
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  max-width: 600px;
  padding: 0 0.8rem;
  width: 100%;
  animation: slide-down 0.2s ease 1;
  z-index: 1;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #303742;
  padding: 20px 5px 10px 5px;
  @media (max-width: 750px) {
    width: 90%;
    justify-content: space-around;
  }
`;

export const ModalTitle = styled.span<{ light: boolean }>`
  font-size: 30px;
  font-weight: 500;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
`;

export const ModalFooter = styled.div<{ light: boolean }>`
  padding: 10px 0px;
  text-align: right;
  color: ${(props) => (!props.light ? "#eee" : "#000")};
`;

export const Button = styled.button<{ light: boolean }>`
  background-color: ${(props) => (props.light ? "#eee" : "#333")};
  color: ${(props) => (!props.light ? "#eee" : "#333")};

  font-size: 1em;
  margin: 10px;
  padding: 5px 10px;
  border: 2px solid #3a2948;
  border-radius: 3px;
  cursor: pointer;
`;
