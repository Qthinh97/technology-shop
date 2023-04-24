import styled from "styled-components";

export const CategoryPageWrap = styled.div`
  display: flex;
  max-width: 1216px;
  min-height: 400px;
  margin: auto;
  margin-top: 100px;
  padding: 12px;
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

export const ImgProduct = styled.img`
  display: flex;
  margin: auto;
  max-width: 160px;

  &:hover {
    transform: scale(1.05);
  }
`;
