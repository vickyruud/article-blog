import React from "react";
import {
  ModalBlock,
  ModalClose,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./modal.styles";
import NewArticleForm from "./NewArticleForm";

const ModalForm = ({
  active,
  hideModal,
  light,
  setArticles,
}: {
  active: any;
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
            <NewArticleForm hideModal={hideModal} light={light} setArticles={setArticles} />
            <ModalFooter light={light}>Bye</ModalFooter>
          </ModalContainer>
        </ModalBlock>
      )}
    </>
  );
};

export default ModalForm;
