import { Col, Row } from "antd";
import styled from "styled-components";
export const DetailWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 24px;
`;

export const DetailContainer = styled(Row)`
  max-width: 1232px;
  display: flex;
  flex-wrap: nowrap;
`;

export const DetailContent = styled(Col)`
  background-color: #fff;
  padding: 24px;
  margin-right: 12px;
  border-radius: 10px;
  display: flex;
  text-align: start;
`;

export const DetailLeftContent = styled.div`
  width: 350px;
`;
export const DetailRightContent = styled.div`
  width: calc(100% - 350px);
`;

export const DetailMainImage = styled.img`
  max-width: 327px;
  min-width: 240px;
  width: 100%;
`;
export const DetailInfo = styled.div``;

export const Brand = styled.div`
  color: rgb(20, 53, 195);
  margin-bottom: 24px;
`;

export const DetailPrice = styled.div`
  color: rgb(20, 53, 195);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
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

export const PolicyDetail = styled(Col)`
  width: 100%;
`;

export const PolicyWrapper = styled.div`
  background-color: #fff;
  padding: 12px;
  border-radius: 10px;
`;

export const ContentPolicy = styled.div`
  display: flex;
  line-height: 1.2;
  text-align: start;
  margin-bottom: 6px;
`;

export const PolicyIcon = styled.img`
  width: 26px;
  margin-right: 8px;
`;

export const OtherInfoWrapper = styled(Row)`
  max-width: 1232px;
  display: flex;
  flex-wrap: nowrap;
  padding: 20px;
  background-color: #fff;
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
`;

export const OtherInfoContent = styled(Col)`
  text-align: start;
  margin-right: 12px;
`;

export const OtherInfoTable = styled(Col)`
  text-align: start;
  padding: 16px;
`;
