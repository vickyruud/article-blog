import React from "react";
import {
  ModalBlock,
  ModalClose,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  ModalBody,
} from "./modal.styles";
import NewArticleForm from "./NewArticleForm";

const ModalForm = ({
  active,
  hideModal,
  light,
  setArticles,
}: {
  active: boolean;
  hideModal: any;
  light: boolean;
  setArticles: any;
}) => {
  return (
    <>
      {active && (
        <ModalBlock>
          <ModalOverlay
            light={light}
            onClick={() => hideModal()}
          ></ModalOverlay>
          <ModalContainer light={light}>
            <ModalHeader>
              <ModalTitle light={light}>Add New Post</ModalTitle>
              <ModalClose light={light} onClick={() => hideModal()}>
                X
              </ModalClose>
            </ModalHeader>
            <ModalBody>
              <NewArticleForm
                hideModal={hideModal}
                light={light}
                setArticles={setArticles}
              />
            </ModalBody>
          </ModalContainer>
        </ModalBlock>
      )}
    </>
  );
};

export default ModalForm;
