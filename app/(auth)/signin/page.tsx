"use client";
import { Button, Form, Input, message } from "antd";
import React from "react";
import styled from "styled-components";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { signIn } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

// Styled components
const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  label {
    font-size: 0.875rem;
    text-transform: uppercase;
    font-weight: 600;
    color: #555;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const Page = () => {
  const [form] = Form.useForm();
  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log("Signed Up");
      const { token } = data;
      console.log(token);
      document.cookie = `user=${token}; path=/; secure; samesite=strict`;
      window.location.href = "/";
    },
    onError: (err) => {
      message.error("An error occurred");
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const userData = {
        email: values.email,
        password: values.password,
      };
      mutate(userData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Title>Sign In</Title>
      <Form form={form}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <InputWrapper>
            <label htmlFor="email">Email</label>
            <Input placeholder="Email" type="email" />
          </InputWrapper>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 8, message: "Password must be at least 8 characters" },
            { max: 20, message: "Password must be at most 20 characters" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          ]}
        >
          <InputWrapper>
            <label htmlFor="password">Password</label>
            <Input.Password
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </InputWrapper>
        </Form.Item>
        <Footer>
          <StyledLink href="/signup">
            Don&apos;t have an account? Sign up
          </StyledLink>
          <StyledButton type="primary" onClick={handleSubmit}>
            Sign In
          </StyledButton>
        </Footer>
      </Form>
    </Wrapper>
  );
};

export default Page;
