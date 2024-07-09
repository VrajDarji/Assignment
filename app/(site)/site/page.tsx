"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  margin-top: 4rem;
  background: rgb(240, 244, 248);
  background: radial-gradient(
    circle,
    rgba(240, 244, 248, 1) 5%,
    rgba(31, 138, 255, 1) 5%,
    rgba(240, 244, 248, 1) 73%
  );
`;

const Title = styled.p`
  font-size: 9rem;
  font-weight: bold;
  text-align: center;
`;
const TextCenter = styled.p`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 400;
  max-width: 800px;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const LogInBtn = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 24px;
  font-size: 20px;
  border: none;
  background: #fff;
  color: black;
  cursor: pointer;
`;
const GetStartedBtn = styled.button`
  padding: 0.75rem 2rem;
  cursor: pointer;
  border-radius: 24px;
  font-size: 20px;
  border: none;
  background: #2563eb;
  color: #fff;
`;

const ImageWrapper = styled.div`
  width: 1200px;
  aspect-ratio: 2.2/1;
  position: relative;
  border-radius: 12px;
  border: 1px solid #efefef;
  margin-top: -0.5rem;
`;

const page = () => {
  return (
    <Wrapper>
      <Title>Word Wave</Title>
      <TextCenter>
        A minimalist blog site for clean and focused reading.
      </TextCenter>
      <CenterDiv>
        <Link href={`/signup`} style={{ textDecoration: "none" }}>
          <LogInBtn>Login</LogInBtn>
        </Link>
        <Link href={`/signin`} style={{ textDecoration: "none" }}>
          <GetStartedBtn>Get Started</GetStartedBtn>
        </Link>
      </CenterDiv>
      <CenterDiv>
        <ImageWrapper>
          <Image
            alt=""
            src="/preview.png"
            fill
            style={{ borderRadius: "12px" }}
          />
        </ImageWrapper>
      </CenterDiv>
      <TextCenter>
        In today&apos;s fast-paced world, finding moments of stillness can be
        challenging. However, carving out time for quiet reflection not only
        nurtures our inner peace but also fosters clarity in our thoughts and
        actions.
      </TextCenter>
    </Wrapper>
  );
};

export default page;
