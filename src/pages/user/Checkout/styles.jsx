import styled from "styled-components";
import { Col, Button } from "antd";

export const CheckoutWrapper = styled.div`
  margin: 100px auto 0;
  padding: 24px;
  max-width: 1048px;
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #000;
`;

export const ImgCartItem = styled.img`
  width: 80px;
  padding-right: 10px;
`;

export const CartPaymentWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const OtherOption = styled.div`
  margin-bottom: 24px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
`;

export const CartPayment = styled.div`
  background-color: #fff;
  padding: 16px;
  line-height: 1.6;
  border-radius: 8px;
`;

export const TotalMoney = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
`;

export const ButtonPayment = styled(Button)`
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

export const Price = styled.p`
  font-weight: 700;
  color: #1435c3;
`;
