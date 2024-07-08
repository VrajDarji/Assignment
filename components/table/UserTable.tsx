"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState, useEffect } from "react";
import { ColDef } from "ag-grid-community";
import { Dropdown, Button, MenuProps } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useModal } from "@/store/index";
import currentUser from "@/utils/currentUser";
import { User } from "@/utils/types";
import { deleteUser } from "@/app/api";
import { handleSignOut } from "../layout/header/Header";

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

  const handleDelete = async (userId: number) => {
    if (user && userId === user.id) {
      const rsp = await deleteUser(userId);
      handleSignOut();
    } else {
      const rsp = await deleteUser(userId);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (() => {
        if (user?.role === "ADMIN" || data.data.id === user?.id) {
          return (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setOpen("user", { user: data.data });
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
        if (user?.role === "ADMIN" || data.data.id === user?.id) {
          return (
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(data.data.id);
              }}
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

const UserTable: React.FC<TableProps> = ({ TData }) => {
  const [cols, setCols] = useState<ColDef[]>([
    { field: "username", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
    { field: "actions", headerName: "", cellRenderer: ActionsCellRenderer },
  ]);
  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: "500px" }}>
      <AgGridReact rowData={TData} columnDefs={cols} pagination={true} />
    </div>
  );
};

export default UserTable;
