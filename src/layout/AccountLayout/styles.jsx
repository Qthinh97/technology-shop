import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const AccountLayout = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const AccountLayoutWrapper = styled.div`
  width: 100%;
  padding: 24px;
  max-width: 1232px;
  display: flex;
`;

export const SidebarAccount = styled.div`
  width: 246px;
  margin-right: 16px;
`;

export const HeaderSidebar = styled.div`
  display: flex;
`;

export const sidebarItem = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
  padding: 8px 0;
  margin: 4px 0;
  cursor: pointer;
  font-size: 14px;
  text-align: start;

  &:hover {
    color: rgb(20, 53, 195);
    font-weight: 700;
  }
  ${(props) =>
    props.active &&
    css`
      color: rgb(20, 53, 195);
      font-weight: 700;
    `}
`;
