import React from "react";
import styled from "styled-components";
import {
  DashboardOutlined,
  FileTextOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ProductOutlined,
  SettingOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const SidebarTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #3b9df7;
`;

const SidebarMenuHeading = styled.p`
  padding: 0 1rem;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: black;
`;

const SidebarMenuLinks = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  width: 100%;
  align-items: center;
  text-transform: capitalize;
  color: #525b63;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  &:hover {
    background: #3b9df7;
    color: white;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  div {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
`;

const SidebarLinks = [
  {
    header: "menu",
    items: [
      { tag: "dashboard", icon: <DashboardOutlined /> },
      // { tag: "products", icon: <ProductOutlined /> },
      // { tag: "orders", icon: <OrderedListOutlined /> },
      { tag: "users", icon: <UserOutlined /> },
      // { tag: "analytics", icon: <PieChartOutlined /> },
      { tag: "blogs", icon: <FileTextOutlined /> },
    ],
  },
  {
    header: "support",
    items: [
      { tag: "privacy", icon: <StopOutlined /> },
      { tag: "settings", icon: <SettingOutlined /> },
    ],
  },
];

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarTop>
        <p>blog site</p>
      </SidebarTop>
      {SidebarLinks.map((link) => (
        <SidebarMenu key={link.header}>
          <SidebarMenuHeading>{link.header}</SidebarMenuHeading>
          <div>
            {link.items.map((item) => (
              <Link
                key={item.tag}
                href={item.tag === "dashboard" ? "/" : `/${item.tag}`}
                style={{ textDecoration: "none" }}
              >
                <SidebarMenuLinks key={item.tag}>
                  {item.icon}
                  <p>{item.tag}</p>
                </SidebarMenuLinks>
              </Link>
            ))}
          </div>
        </SidebarMenu>
      ))}
    </SidebarWrapper>
  );
};

export default Sidebar;
