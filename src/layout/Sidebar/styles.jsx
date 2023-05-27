import styled from "styled-components";
import { Link } from "react-router-dom";

export const Sidebar = styled.div`
  text-align: start;
  font-size: 14px;
  max-width: 100%;
`;

export const CategoryLink = styled(Link)`
  display: flex;
  color: #000;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;

  &:hover {
    background-color: #f3f5fc;
    color: rgb(20, 53, 195);
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
  min-width: 240px;
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

export const ImgProduct = styled.img`
  max-width: 22px;
`;
