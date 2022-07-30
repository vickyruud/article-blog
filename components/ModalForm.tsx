import React from "react";
import {
  ModalBlock,
  ModalBody,
  ModalClose,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./modal.styles";

const ModalForm = ({ active, hideModal }: { active: any; hideModal: any }) => {
  return (
    <>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>Add New Post</ModalTitle>
              <ModalClose onClick={() => hideModal()}>X</ModalClose>
            </ModalHeader>
            <ModalBody>Here you go</ModalBody>
            <ModalFooter>Bye</ModalFooter>
          </ModalContainer>
        </ModalBlock>
      )}
    </>
  );
};

export default ModalForm;
