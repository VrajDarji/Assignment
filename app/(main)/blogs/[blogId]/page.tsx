"use client";
import { getBlog } from "@/app/api";
import { BlogWithUser } from "@/utils/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  params: {
    blogId: number;
  };
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;

  h4 {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: #666;
    margin: 0;
  }
`;

const Content = styled.div`
  font-size: 1.125rem;
  color: #4a4a4a;
  line-height: 1.6;
`;

const Page = ({ params }: Props) => {
  const [blog, setBlog] = useState<BlogWithUser>();

  useEffect(() => {
    const fetchData = async () => {
      const rsp = await getBlog(params.blogId);
      setBlog(rsp);
    };
    fetchData();
  }, [params.blogId]);

  const formattedDate = new Date(blog?.date as string).toDateString();

  return (
    <Wrapper>
      <Header>
        <h4>{blog?.title}</h4>
        <p>
          By {blog?.user.username} on {formattedDate}
        </p>
      </Header>
      <Content>{blog?.description}</Content>
    </Wrapper>
  );
};

export default Page;
