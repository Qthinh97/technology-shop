import { Col } from "antd";
import styled from "styled-components";
export const DetailWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 24px;
`;

export const DetailContainer = styled.div`
  max-width: 1232px;
`;

export const DetailContent = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 10px;
  display: flex;
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
export const DetailInfo = styled.div`
  margin-top: 16px;
`;

export const Brand = styled.div`
  color: rgb(20, 53, 195);
  margin-bottom: 24px;
`;

export const ReviewItemWrapper = styled.div`
  margin-top: 8px;
`;

export const DetailPrice = styled.div`
  color: rgb(20, 53, 195);
  font-size: 20px;
  font-weight: 700;
  margin: 24px 0;
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

  & > h3 {
    margin-top: 0;
  }
`;

export const ContentPolicy = styled.div`
  display: flex;
  line-height: 1.2;
  text-align: start;
  margin-bottom: 6px;
  align-items: center;
`;

export const PolicyIcon = styled.img`
  width: 23px;
  margin-right: 8px;
`;

export const OtherInfoWrapper = styled.div`
  max-width: 1188px;
  flex-wrap: nowrap;
  padding: 20px;
  background-color: #fff;
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
`;

export const OtherInfoContent = styled.div`
  text-align: start;
  max-width: 100%;
  overflow: hidden;
`;
