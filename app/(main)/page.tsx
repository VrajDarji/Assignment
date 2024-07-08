"use client";

import { useEffect, useState } from "react";
import { getBlogs } from "../api";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { BlogWithUser } from "@/utils/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  row-gap: 1rem;
  // padding: 2rem;
  // background-color: #f4f4f9;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 1rem;
`;

const BlogWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  h4 {
    font-size: 1.5rem;
    color: #1a202c;
    margin: 0;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    color: #4a5568;
    margin: 0;
  }
`;

const NoBlogsMessage = styled.p`
  text-align: center;
  padding: 2rem 0;
  font-size: 1.5rem;
  color: #718096;
`;

export default function Home() {
  const [blogs, setBlogs] = useState<BlogWithUser[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const rsp = await getBlogs();
      const data = rsp.filter((r: any, idx: any) => idx < 10);
      setBlogs(data);
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      <Header>Top Blogs</Header>
      {blogs.map((blog) => (
        <BlogWrapper
          key={blog.id}
          onClick={() => router.push(`/blogs/${blog.id}`)}
        >
          <h4>{blog.title}</h4>
          <p>{blog.description}</p>
        </BlogWrapper>
      ))}
      {blogs.length === 0 && <NoBlogsMessage>No blogs to show</NoBlogsMessage>}
    </Wrapper>
  );
}
