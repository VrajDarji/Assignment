"use client";
import axios from "axios";
import UserTable from "@/components/table/UserTable";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { getAllUser } from "@/app/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #525b63;
  padding: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #525b63;
`;

const Page = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const rsp = await getAllUser();
      setRowData(rsp);
    };

    fetchData();
  }, []);
  return (
    <Wrapper>
      <Header>
        <Title>Users ({rowData.length})</Title>
        <Button>Add User</Button>
      </Header>
      <UserTable TData={rowData} />
    </Wrapper>
  );
};

export default Page;
