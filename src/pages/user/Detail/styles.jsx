import styled from "styled-components";
export const DetailWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const DetailContent = styled.div`
  background-color: #fff;
  padding: 24px;
  margin: 12px;
  max-width: 1100px;
  width: 100%;
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