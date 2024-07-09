"use client";
import { Button } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { User } from "@/utils/types";
import currentUser from "@/utils/currentUser";

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: end;
  z-index: 20;
  width: 100%;
  column-gap: 1rem;
  background: #eff3f8;
  border-bottom: 1px solid #efefef;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
`;

const Nav = () => {
  return (
    <Navbar>
      <Link href={`/signup`}>
        <Button type="primary">Sign Up</Button>
      </Link>
      <Link href={`/signin`}>
        <Button type="primary">Sign In</Button>
      </Link>
    </Navbar>
  );
};

export default Nav;
