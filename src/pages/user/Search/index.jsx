import * as S from "./styles";
import { Link, generatePath, useParams } from "react-router-dom";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";

import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getProductListAction, getSeriesAction } from "../../../redux/action";
import { ROUTES } from "../../../constants/routes";

function SearchPage() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({
    seriesId: [],
    sort: "",
  });

  const { productList } = useSelector((state) => state.product);
  const { seriesList } = useSelector((state) => state.series);

  const params = useParams();

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
        categoryId: params.categoryId,
      })
    );
  }, [params.categoryId]);

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderSeries = useMemo(() => {
    return seriesList.data.map((item) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  }, [seriesList.data]);

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
        [key]: values,
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
    <S.CategoryPageWrap>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col span={4}>
          <Card title="Phân loại" size="small">
            <Checkbox.Group
              style={{ textAlign: "start" }}
              onChange={(values) => handleFilter("seriesId", values)}
            >
              <Row>{renderSeries}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={20}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
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
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductList}</Row>
          {productList.data.length !== productList.meta.total && (
            <Button
              style={{ marginTop: "16px" }}
              onClick={() => handleShowMore()}
            >
              Show more
            </Button>
          )}
        </Col>
      </Row>
    </S.CategoryPageWrap>
  );
}

export default SearchPage;
