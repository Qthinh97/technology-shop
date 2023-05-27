import { Link } from "react-router-dom";
import styled from "styled-components";

export const AccountWrapper = styled.div`
  width: 100%;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px 16px;
  background-color: #fff;
`;

export const ImgProduct = styled.img`
  margin: 0 8px;
  max-width: 67px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

export const NameProduct = styled(Link)`
  max-width: 400px;
  width: 100%;
  text-align: start;
  margin-right: 16px;
  color: #000;
  text-decoration: none;
`;

export const PriceProduct = styled.div`
  font-weight: 700;
  color: #1435c3;
  text-align: start;
  max-width: 110px;
  width: 100%;
`;
