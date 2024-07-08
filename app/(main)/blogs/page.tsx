"use client";
import axios from "axios";
import UserTable from "@/components/table/UserTable";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import BlogTable from "@/components/table/BlogsTable";
import { useModal } from "@/store";
import { getBlogs, getMyBlogs } from "@/app/api";

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

type Props = {
  searchParams: {
    mine: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const [rowData, setRowData] = useState([]);
  const [title, setTitle] = useState("Blogs");
  const { setOpen } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams && searchParams.mine === "true") {
        const rsp = await getMyBlogs();
        setRowData(rsp);
        setTitle("My Blogs");
      } else {
        const rsp = await getBlogs();
        setRowData(rsp);
        setTitle("Blogs");
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <Wrapper>
      <Header>
        <Title>
          {title} ({rowData.length})
        </Title>
        <Button onClick={() => setOpen("blog")}>Add Blog</Button>
      </Header>
      <BlogTable TData={rowData} />
    </Wrapper>
  );
};

export default Page;
