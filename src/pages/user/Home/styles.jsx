import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
`;

export const ProductListWrapper = styled.div`
  display: flex;
  max-width: 1232px;
  padding: 16px;
  width: 100%;
  min-height: 400px;
  margin: auto;
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

export const ProductList = styled.div`
  width: 100%;
`;

export const ImgProduct = styled.img`
  display: flex;
  margin: auto;
  max-width: 160px;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BackgroundImage = styled.div`
  background-image: url("https://lh3.googleusercontent.com/FXs0Avw0ggc2aVTIpcirJCIcA21CgXg0Y90mtKkftwmy7KRRcQhU7wcmyLw6q1pKDCvBkyQVgwZg7hywsJlN11TCJQB12Oem=w1920-rw");
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
  width: 100%;
  height: 100vh;
  max-height: 550px;
`;
