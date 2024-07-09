import { signOut } from "@/app/api";
import currentUser from "@/utils/currentUser";
import { User } from "@/utils/types";
import { BellOutlined } from "@ant-design/icons";
import { Avatar as AntAvatar, Button, Dropdown, Input, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.nav`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #525b63;
  text-transform: capitalize;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  align-items: center;
`;

const Avatar = styled(AntAvatar)`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 100%;
  padding: 4px;
`;

const InfoWrapper = styled.div`
  padding: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;
  div {
    dispaly: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    h4 {
      font-size: 1rem;
      font-weight: 500;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      color: #525b63;
    }
  }
`;

export const handleSignOut = () => {
  document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict`;
  window.location.href = `/`;
};

const Nav = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const items: MenuProps["items"] = [
    {
      label: (
        <InfoWrapper>
          <Avatar style={{ cursor: "pointer" }}>{user?.username[0]}</Avatar>
          <div>
            <h4>{user?.username}</h4>
            <p>{user?.email}</p>
          </div>
        </InfoWrapper>
      ),
      key: 0,
    },
    {
      key: 1,
      label: (
        <Link href={`/blogs?mine=true`} style={{ textDecoration: "none" }}>
          <Button type="link">My Blogs</Button>
        </Link>
      ),
    },
    {
      label: (
        <Button onClick={handleSignOut} type="link">
          Sign out
        </Button>
      ),
      key: 2,
    },
  ];
  const pathname = usePathname();
  return (
    <HeaderWrapper>
      <Title>{pathname === "/" ? "dashboard" : pathname.split("/")[1]}</Title>
      <ActionsWrapper>
        <Input.Search placeholder="Search..." enterButton />
        <Dropdown trigger={["click"]} menu={{ items }}>
          <Avatar style={{ cursor: "pointer" }}>{user?.username[0]}</Avatar>
        </Dropdown>
        <Button type="link" icon={<BellOutlined />} />
      </ActionsWrapper>
    </HeaderWrapper>
  );
};

export default Nav;
