import React, { useState } from "react";
import { Modal, Button } from "antd";

const CustomModal = ({ closable, modalTitle, children, modalState, closeModal,width,padding }) => {
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        style={{padding:`${padding}px!important`}}
        centered
        title={modalTitle}
        visible={modalState}
        footer={null}
        onCancel={closeModal}
        width={width}
        closable={false}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
