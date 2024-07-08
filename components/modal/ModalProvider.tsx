import React from "react";
import BlogModal from "./BlogModal";
import UserModal from "./UserModal";

const ModalProvider = () => {
  return (
    <>
      <BlogModal />
      <UserModal />
    </>
  );
};

export default ModalProvider;
