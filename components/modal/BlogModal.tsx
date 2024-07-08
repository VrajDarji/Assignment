"use client";
import { useModal } from "@/store";
import { Modal as AntModal, Form, Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createBlog, updateBlog } from "@/app/api";
import { dataTagSymbol, useMutation } from "@tanstack/react-query";
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

const BlogModal = () => {
  const { data: InitialData, open, setOpen } = useModal();
  const isOpen = open === "blog";
  const [title, setTitle] = useState("Add new blog");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleCancel = () => {
    setOpen("");
    form.resetFields();
  };

  const { mutate: createBlogMutate } = useMutation({
    mutationFn: (data: any) => createBlog(data),
    onSuccess: (data) => {
      message.success("Blog created successfully!");
      setOpen("");
      form.resetFields();
      router.refresh();
    },
    onError: (err) => {
      message.error("Failed to create blog");
      console.error(err);
    },
  });

  const { mutate: updateBlogMutate } = useMutation({
    mutationFn: (data: any) => updateBlog(data),
    onSuccess: (data) => {
      message.success("Blog updated successfully!");
      setOpen("");
      form.resetFields();
      router.refresh();
    },
    onError: (err) => {
      message.error("Failed to update blog");
      console.error(err);
    },
  });

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);
      if (InitialData?.blog) {
        const data = {
          title: values.title,
          description: values.description,
          id: InitialData.blog.id,
        };
        updateBlogMutate(data);
      } else {
        createBlogMutate(values);
      }
    } catch (error) {
      message.error("Please fix the errors in the form.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (InitialData?.blog && isOpen) {
      form.setFieldsValue({
        title: InitialData.blog.title,
        description: InitialData.blog.description,
      });
      setTitle("Edit your blog");
    } else {
      setTitle("Add new blog");
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
          <label htmlFor="">Title</label>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="">Title</label>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </InputWrapper>
      </Form>
    </Modal>
  );
};

export default BlogModal;
