import * as S from "./styles";
import Sidebar from "../../../layout/Sidebar";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";

import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getProductListAction } from "../../../redux/action";

import logo from "../../../assets/images/icon/cpu.svg";

function HomePage() {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, []);

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col key={item.id} xs={24} md={12} xl={6}>
          <Link>
            <S.CardCustom>
              <div>
                <S.ImgProduct alt="logo" src={item.image} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgb(130, 134, 158)",
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  {item.Brand}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgb(20, 53, 195) ",
                    fontWeight: 700,
                    position: "absolute",
                    bottom: "8px",
                  }}
                >
                  {item.price.toLocaleString()}đ
                </p>
              </div>
            </S.CardCustom>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.HomeWrapper>
      <Sidebar />
      <S.ProductList>
        <Select
          style={{
            width: "30%",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          <Select.Option value="desc">Giá tăng dần</Select.Option>
          <Select.Option value="asc">Giá giảm dần</Select.Option>
        </Select>
        <Row gutter={[16, 16]}>{renderProductList}</Row>
        {productList.data.length !== productList.meta.total && (
          <Button
            style={{ marginTop: "16px" }}
            onClick={() => handleShowMore()}
          >
            Show more
          </Button>
        )}
      </S.ProductList>
    </S.HomeWrapper>
  );
}

export default HomePage;
