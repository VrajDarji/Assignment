"use client";

import React from "react";
import styled from "styled-components";
import Sidebar from "./sidebar/sidebar";
import Nav from "./header/Header";

const MainLayout = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  color: black;
  overflow: hidden;
  font-family: "Arial", sans-serif;
`;

const Sider = styled.aside`
  position: relative;
  width: 15%;
  height: 100%;
  background-color: #fff;
  color: #fff;
  border-right: 1px solid #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainWrapper = styled.div`
  width: 85%;
  background-color: #f0f4f8;
`;

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Content = styled.main`
  overflow-y: scroll;
  padding: 2rem;
  height: 96vh;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <Sider>
        <Sidebar />
      </Sider>
      <MainWrapper>
        <Header>
          <Nav />
        </Header>
        <Content>{children}</Content>
      </MainWrapper>
    </MainLayout>
  );
};

export default Layout;
