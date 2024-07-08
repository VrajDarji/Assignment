"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { signup } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import { useEmail } from "@/store";
import Link from "next/link";

const Wrapper = styled.div`
  width: 500px;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 1px solid;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  label {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const NameWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Page = () => {
  const [form] = Form.useForm();
  const { setEmail } = useEmail();
  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signed Up");
      console.log(data);
      window.location.href = "/signin";
    },
  });
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const userData = {
        username: `${values.first_name} ${values.last_name}`,
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
      <Title>Sign Up</Title>
      <Form form={form}>
        <NameWrapper>
          <Form.Item
            name={"first_name"}
            rules={[{ required: true, message: "First name is required" }]}
          >
            <InputWrapper>
              <label htmlFor="">first name</label>
              <Input placeholder="First Name" />
            </InputWrapper>
          </Form.Item>
          <Form.Item name={"last_name"} rules={[{ required: false }]}>
            <InputWrapper>
              <label htmlFor="">last name</label>
              <Input placeholder="Last Name" />
            </InputWrapper>
          </Form.Item>
        </NameWrapper>
        <Form.Item name={"email"} rules={[{ required: true }]}>
          <InputWrapper>
            <label htmlFor="">Email</label>
            <Input placeholder="Email" type="email" />
          </InputWrapper>
        </Form.Item>
        <Form.Item name={"password"} rules={[{ required: true, max: 8 }]}>
          <InputWrapper>
            <label htmlFor="">password</label>
            <Input.Password
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </InputWrapper>
        </Form.Item>
        <Footer>
          <Link href={"/signin"}>Already have account sign in</Link>
          <Button onClick={handleSubmit}>Login</Button>
        </Footer>
      </Form>
    </Wrapper>
  );
};

export default Page;
