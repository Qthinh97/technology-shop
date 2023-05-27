import styled from "styled-components";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

export const BuildPCWrapper = styled.div`
  margin-top: 100px;
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
`;

export const BuildPCContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1230px;
`;

export const BuildPCContent = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
`;

export const HeaderBuildPC = styled(Col)`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  width: 100%;
`;

export const ListCategoriesWrapper = styled(Col)`
  margin-right: 12px;
`;

export const CategoryBuildItemWrap = styled.div`
  background-color: #fff;
  padding: 24px 16px;
  margin-bottom: 16px;
  border-radius: 8px;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export const ImgCategory = styled.div`
  border-radius: 8px;
  height: 84px;
  padding: 0;
  margin: 0 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  border: 1px solid #d9d9d9;
  cursor: pointer;
`;

export const NameCategory = styled(Col)`
  padding: 0 8px;
  width: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InforItem = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 8px;
`;

export const NameInfoItem = styled(Link)`
  text-align: start;
  font-size: 14px;
  width: 100%;
  max-width: 240px;
  color: #000;
  text-decoration: none;
`;

export const PriceItem = styled.h3`
  color: rgb(20, 53, 195);
  padding-left: 20px;
`;

export const ButtonShow = styled(Button)`
  background-color: rgb(20, 53, 195);
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;

export const AddCart = styled.div`
  position: sticky;
  top: 100px;
  padding: 4px 20px;
  max-height: 330px;
  background-color: #fff;
  width: 100%;
`;

export const ModalSelectItem = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  padding: 32px 24px 24px;
  background-color: #fff;
  border-radius: 8px;
  width: 700px;
  height: 550px;
`;

export const HeaderModal = styled.div``;

export const ModalProductList = styled.div`
  border-top: 1px dashed #000;
  border-bottom: 1px dashed #000;
  height: 450px;
  overflow: auto;
`;
export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px 16px;
  border-top: 1px dashed #000;
  border-bottom: 1px dashed #000;
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

export const ButtonSelectProduct = styled(Button)`
  font-weight: 600;
  color: #fff;
  margin: auto;
  background-color: #1435c3;
  border: none;
`;

export const Buttom = styled.div`
  padding: 14px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-self: center;
  transition: all 0.3s;
  cursor: pointer;
  margin-top: 14px;

  ${(props) => {
    switch (props.type) {
      case "primary": {
        return `
          background-color: #1435c3;
          color: white;
          border: none;

          &:active  {
            opacity: 0.7; 
          }
        `;
      }
      default: {
        return `
          background-color: transparent;
          border: 1px solid #1435c3;
            color: #1435c3;

          &:active {
            background-color: #5270f9bb
          }
        `;
      }
    }
  }};
`;

export const TotalPrice = styled.span`
  font-size: 20px;
  color: #1435c3;
  font-weight: 700;
`;
