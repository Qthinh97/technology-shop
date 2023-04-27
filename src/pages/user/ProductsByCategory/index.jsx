import * as S from "./styles";
import { Link, generatePath, useParams } from "react-router-dom";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";

import { PRODUCT_LIMIT } from "../../../constants/paging";
import { getProductListAction, getSeriesAction } from "../../../redux/action";
import { ROUTES } from "../../../constants/routes";

function ProductsByCategoryPage() {
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState({
    seriesId: [],
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
    dispatch(getSeriesAction({ categoryId: params.categoryId }));
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

  const handleFilterSeries = (values) => {
    setFilterParams({
      ...filterParams,
      seriesId: values,
    });
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
        seriesId: values,
        categoryId: params.categoryId,
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
    <S.CategoryPageWrap>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col span={4}>
          <Card title="Phân loại" size="small">
            <Checkbox.Group
              style={{ textAlign: "start" }}
              onChange={(values) => handleFilterSeries(values)}
            >
              <Row>{renderSeries}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={20}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Select style={{ width: "100%" }}>
                <Select.Option value="desc">Giá tăng dần</Select.Option>
                <Select.Option value="asc">Giá giảm dần</Select.Option>
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

export default ProductsByCategoryPage;
