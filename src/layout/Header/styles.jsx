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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
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
  height: 300px;
  position: absolute;
  left: 0;
  top: 40px;
  border: 1px solid #ccc;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ItemListSearch = styled(Link)`
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
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
    color: #000;
  }

  &:active {
    background-color: #ccc;
  }
`;

export const ModalCategoriesHeader = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  padding-left: 140px;
  padding-top: 100px;
  z-index: 100;
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

export const ImgProduct = styled.img`
  max-width: 60px;
`;

export const CardCustom = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  text-align: start;
  padding: 16px;
  min-height: 300px;
  max-height: 300px;
  background-color: #fff;
`;

//Dropdown Cart
export const DropdownCartWrapper = styled.div`
  width: 400px;
  height: 384px;
  display: none;
  position: absolute;
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: start;
`;

export const DropCartList = styled.div`
  width: 100%;
  overflow: auto;
  height: 284px;
`;

export const DropCartTotal = styled.div`
  padding-top: 16px;
  border-top: 1px dashed #000;
`;

export const ImgCartItem = styled.img`
  width: 80px;
  padding-right: 10px;
`;

export const ProductCart = styled(Link)`
  display: flex;
  align-items: center;
  color: #000;
  margin-bottom: 10px;
  text-decoration: none;
  background-color: #fff;
`;

export const InfoCart = styled.div`
  font-size: 12px;
`;

export const infoListSearch = styled.div`
  text-decoration: none;
`;

export const CustomSearchProductList = styled.div`
  position: absolute;
  max-height: 300px;
  max-width: 500px;
  width: 100%;
  overflow: auto;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const CartEmptyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CartEmpty = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
  width: 250px;
`;

export const TotalMoney = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
`;

export const ButtonPayment = styled(Button)`
  width: 100%;
  background-color: rgb(20, 53, 195);
  color: #fff;
  margin-top: 16px;
  font-size: 16px;
`;
