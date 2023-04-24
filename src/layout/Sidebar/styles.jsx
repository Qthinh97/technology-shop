import styled from "styled-components";
import { Link, generatePath } from "react-router-dom";

export const Sidebar = styled.div`
  padding: 12px;
  text-align: start;
  font-size: 14px;
`;

export const CategoryLink = styled(Link)`
  display: block;
  color: #000;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 8px;

  &:hover {
    background-color: #f3f5fc;
    color: #1435c3;
  }

  &:active {
    background-color: #f3f5fc;
  }
`;

export const CustomCard = styled.div`
  margin: 0;
  padding: 0;
  background-color: #fff;
  border-radius: 8px;
  min-width: 200px;
  padding-bottom: 16px;
`;

export const HeaderCard = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #000;
  font-weight: 600;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;
