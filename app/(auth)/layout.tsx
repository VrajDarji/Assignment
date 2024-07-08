"use client";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f7fbfe;
  align-items: center;
  justify-content: center;
`;

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default layout;
