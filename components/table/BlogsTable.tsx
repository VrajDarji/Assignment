"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState, useEffect } from "react";
import { ColDef } from "ag-grid-community";
import { Dropdown, Button, MenuProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useModal } from "@/store";
import Link from "next/link";
import currentUser from "@/utils/currentUser";
import { deleteBlog } from "@/app/api";
import { useRouter } from "next/navigation";
import { User } from "@/utils/types";

interface TableProps {
  TData: any;
}

const ActionsCellRenderer = (data: any) => {
  const { setOpen } = useModal();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);
  const router = useRouter();

  const hadleDelete = async (blogId: number) => {
    const rsp = await deleteBlog(blogId);
    router.refresh();
    return rsp;
  };

  const items: MenuProps["items"] = [
    {
      key: 0,
      label: (
        <Link
          href={`/blogs/${data.data.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button type="link" icon={<EyeOutlined />}>
            View
          </Button>
        </Link>
      ),
    },
    {
      key: 1,
      label: (() => {
        if (user?.role === "ADMIN" || data.data.user.id === user?.id) {
          console.log(data.data.userId);
          return (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setOpen("blog", { blog: data.data });
                console.log(data.data);
              }}
            >
              Edit
            </Button>
          );
        }
      })(),
    },
    {
      key: 2,
      label: (() => {
        if (user?.role === "ADMIN" || data.data.user.id === user?.id) {
          return (
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => hadleDelete(data.data.id)}
            >
              Delete
            </Button>
          );
        }
      })(),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <MoreOutlined />
    </Dropdown>
  );
};

const BlogTable: React.FC<TableProps> = ({ TData }) => {
  const [cols, setCols] = useState<ColDef[]>([
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "description" },
    { field: "user.username", headerName: "Authour" },
    {
      field: "date",
      headerName: "createdAt",
      valueFormatter: (p) => new Date(p.value).toDateString(),
    },
    { field: "actions", headerName: "", cellRenderer: ActionsCellRenderer },
  ]);
  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: "500px" }}>
      <AgGridReact rowData={TData} columnDefs={cols} />
    </div>
  );
};

export default BlogTable;
