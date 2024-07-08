import React from "react";
import Layout from "@/components/layout/Layout";
import ModalProvider from "@/components/modal/ModalProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      {children} <ModalProvider />
    </Layout>
  );
};

export default layout;
