import * as S from "./styles";
import Sidebar from "../../../layout/Sidebar";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";

import { PRODUCT_LIMIT } from "../../../constants/paging";
import { ROUTES } from "../../../constants/routes";
import { getProductListAction } from "../../../redux/action";
import SlideShow from "../../../layout/SlideShow";
import "react-slideshow-image/dist/styles.css";

function HomePage() {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);

  const slideImages = [
    {
      url: "https://lh3.googleusercontent.com/FXs0Avw0ggc2aVTIpcirJCIcA21CgXg0Y90mtKkftwmy7KRRcQhU7wcmyLw6q1pKDCvBkyQVgwZg7hywsJlN11TCJQB12Oem=w1920-rw",
    },
    {
      url: "https://lh3.googleusercontent.com/vkMMX2cvl_1ii0c_vw5TGy4ixhRc-l7OlMWnmx4-oxquqHo_A9aET_lWxDmxbh-GMZTr3O5JS4kGNa0Ka7hcctxo2lj0xoUR=w1920-rw",
    },
    {
      url: "https://lh3.googleusercontent.com/6oTamJC_m5UID0FaspcgE2OxonzDY3qxByN33paYAaX4uCBwCm-4yhRJz_7XDaTEUmWJ-dF1jNGQi-tuXijmZ9YhKQJn8zo=w1920-rw",
    },
    {
      url: "https://lh3.googleusercontent.com/VJLVcyS_vKACJL1nK7QdWHQwfO_XixEBI9WLterUkYD_fR6KKZhwNl-yiI8ao1lio_bBerSB_wFZIT3EajO9mqWviom85ftR=w1920-rw",
    },
  ];

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
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const [filterParams, setFilterParams] = useState({
    sort: "",
  });

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  };

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col key={item.id} xs={24} md={12} xl={6}>
          <Link to={generatePath(ROUTES.USER.DETAIL, { id: item.id })}>
            <S.CardCustom>
              <div>
                <S.ImgProduct alt="logo" src={item.image} />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgb(130, 134, 158)",
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  {item.brand}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#000",
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    color: "rgb(20, 53, 195) ",
                    fontWeight: 700,
                    position: "absolute",
                    bottom: "22px",
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
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <SlideShow slideImages={slideImages} />
      </div>
      <S.ProductListWrapper>
        <Sidebar />
        <S.ProductList>
          <Select
            onChange={(value) => handleFilter("sort", value)}
            placeholder="Sắp xếp theo"
            style={{
              width: "30%",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            <Select.Option value="name.desc">Tên A-Z</Select.Option>
            <Select.Option value="name.asc">Tên Z-A</Select.Option>
            <Select.Option value="price.asc">Giá tăng dần</Select.Option>
            <Select.Option value="price.desc">Giá giảm dần</Select.Option>
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
      </S.ProductListWrapper>
    </S.HomeWrapper>
  );
}

export default HomePage;
