import styled from "styled-components";
import { Table, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";

export const CartWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 24px;
`;

export const CartContainer = styled.div`
  max-width: 1232px;
  width: 100%;
`;

export const HeaderWrapper = styled(Row)``;

export const CartContentWrapper = styled(Row)`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;
export const CartPaymentWrapper = styled(Col)`
  width: 100%;
`;

export const CartPromotion = styled.div`
  background-color: #fff;
  padding: 16px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const AddPromotion = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #1435c3;
  display: flex;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.7;
  }
`;

export const HeaderAddPromotion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartPayment = styled.div`
  background-color: #fff;
  padding: 16px;
  line-height: 1.6;
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

export const CartContent = styled(Col)`
  background-color: #fff;
  padding: 24px;
  border-radius: 10px;
  margin-right: 16px;
`;

export const HeaderCart = styled(Col)`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  width: 100%;
`;

export const CartEmptyWrapper = styled.div`
  width: 100%;
  background-color: #fff;
`;

export const CartEmpty = styled.div`
  padding: 32px;
`;

export const ImgCartItem = styled.img`
  width: 80px;
  padding-right: 10px;
`;

export const Product = styled(Link)`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #000;
`;

export const ModalDeleteWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalDelete = styled.div`
  background-color: #fff;
  width: 400px;
  position: relative;
  padding: 24px;
  border-radius: 12px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ButtonModal = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  ${(props) => {
    switch (props.type) {
      case "primary": {
        return `
          background-color: rgb(20, 53, 195);
          color: white;
          border: none;

          &:hover {
            opacity: 0.7; 
          }
        `;
      }
      case "outline":
      default: {
        return `
          background-color: transparent;
          border: 1px solid gray;
          color: #000;
          margin-right: 12px;
          

          &:hover {
            border: 1px solid #000;
          }
        `;
      }
    }
  }};
`;

export const ButtonClose = styled(Button)`
  background-color: #fff;
  border: none;
  position: absolute;
  top: 24px;
  right: 24px;
`;
