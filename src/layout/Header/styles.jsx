import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";

export const HeaderWrapper = styled.div`
  max-width: 100%;
  height: 100px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
`;

export const IconMain = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 10px;
  max-width: 90px;
`;

export const CustomSearchHeader = styled(Input.Search)`
  max-width: 600px;
  margin: 0 10px;
`;

export const CustomModalSearch = styled.div`
  max-width: 600px;
  margin: 0 10px;
`;

export const CategoryProduct = styled(Button)`
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 8px 12px;
  border: 2px solid #ccc;
  font-weight: 500;

  &:hover {
    background-color: #f1f1f1;
  }

  &:active {
    background-color: #ccc;
  }
`;

export const CartShopping = styled(Link)`
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 18px;
  max-width: 80px;
  flex-wrap: wrap;
  margin: 0 10px;
`;

export const BuildPC = styled(Link)`
  max-width: 90px;
  min-width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  flex-wrap: wrap;
  font-size: 18px;
  color: #000;
  margin: 0 10px;
`;

export const Register = styled(Link)`
  min-width: 170px;
  max-width: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  flex-wrap: wrap;
  font-size: 18px;
  color: #000;
  margin: 0 10px;
`;
