"use client";
import { useModal } from "@/store";
import { Modal as AntModal, Form, Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { updateUser } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Modal = styled(AntModal)``;

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

const UserModal = () => {
  const { data: InitialData, open, setOpen } = useModal();
  const isOpen = open === "user";
  const [title, setTitle] = useState("Add new user");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleCancel = () => {
    setOpen("");
    form.resetFields();
  };

  const { mutate } = useMutation({
    mutationFn: (data: any) => updateUser(data),
    onSuccess: (data) => {
      message.success("User updated successfully!");
      setOpen("");
      form.resetFields();
      router.refresh();
    },
    onError: (err) => {
      message.error("Failed to update user");
      console.error(err);
    },
  });

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);
      if (InitialData?.user) {
        const data = {
          username: values.username,
          email: values.email,
          id: InitialData.user.id,
        };
        mutate(data);
      }
    } catch (error) {
      message.error("Please fix the errors in the form.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (InitialData?.user && isOpen) {
      form.setFieldsValue({
        email: InitialData.user.email,
        username: InitialData.user.username,
      });
      console.log(InitialData.user);
      setTitle("Edit your details");
    } else {
      setTitle("Add new user");
      form.resetFields();
    }
  }, [InitialData, form, isOpen]);

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" size="middle" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="middle"
          onClick={handleSubmit}
          loading={loading}
        >
          Confirm
        </Button>,
      ]}
    >
      <Form form={form}>
        <InputWrapper>
          <label htmlFor="">username</label>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="">email</label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </InputWrapper>
      </Form>
    </Modal>
  );
};

export default UserModal;
