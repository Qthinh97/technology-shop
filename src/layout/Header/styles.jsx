import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";

export const HeaderWrapper = styled.div`
  max-width: 100%;
  height: 100px;
  z-index: 100;
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
  max-width: 500px;
  width: 100%;
`;

export const CustomModalSearch = styled.div`
  max-width: 500px;
  width: 100%;
  max-height: 300px;
  position: absolute;
  left: 0;
  top: 40px;
  border: 1px solid #ccc;
  overflow: auto;
`;

export const CategoriesButtomWrapper = styled.div`
  position: relative;
  margin: 0 10px;
`;

export const CategoriesButtom = styled(Button)`
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const ModalCategoriesHeader = styled.div`
  position: absolute;
  left: -12px;
  margin-top: 40px;
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
