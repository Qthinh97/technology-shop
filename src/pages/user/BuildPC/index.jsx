import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Row, Col, Select, Space } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import {
  getCategoryAction,
  getProductListAction,
  addItemBuildAction,
  updateItemBuildAction,
  deleteItemBuildAction,
  deleteListBuildAction,
  addToCartAction,
} from "redux/action";
import { PRODUCT_LIMIT } from "../../../constants/paging";

import EmptyCart from "../../../assets/images/logo/empty_cart.png";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

function BuildPCPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [filterParams, setFilterParams] = useState({
    searchKey: "",
    sort: "",
  });

  const [categoryId, setCategoryId] = useState("");

  const { productList } = useSelector((state) => state.product);

  const { categoryList } = useSelector((state) => state.category);

  const { buildList } = useSelector((state) => state.build);

  let totalPriceBuild = 0;

  for (let i = 0; i < buildList.length; i++) {
    totalPriceBuild =
      totalPriceBuild + buildList[i]?.data.price * buildList[i]?.quantity;
  }

  useEffect(() => {
    dispatch(
      getCategoryAction({
        page: 1,
      })
    );
  }, []);

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
        categoryId: categoryId,
      })
    );
  };

  const handleActiveItem = (item) => {
    dispatch(
      addItemBuildAction({
        categoryId: item.categoryId,
        data: {
          img: item.image,
          name: item.name,
          price: item.price,
          id: item.id,
        },
        quantity: 1,
      })
    );
  };

  const renderCategoryBuildPC = useMemo(() => {
    return categoryList.data.map((item) => {
      const findIndexBuildList = buildList.findIndex(
        (i) => i.categoryId === item.id
      );
      const valuesItem = buildList[findIndexBuildList];

      return (
        <S.CategoryBuildItemWrap key={item.id}>
          <Row value={item.id} wrap={false}>
            <S.NameCategory span={3}>{item.namebuild}</S.NameCategory>
            <S.ImgCategory onClick={() => handleShowProductList(item.id)}>
              {findIndexBuildList === -1 ? (
                <img width="84" height="84" src={item.img} alt="category" />
              ) : (
                <img
                  width="84"
                  height="84"
                  src={valuesItem?.data.img}
                  alt="category"
                />
              )}
            </S.ImgCategory>
            {findIndexBuildList === -1 ? (
              <S.InforItem span={14}>
                <p>Vui lòng chọn linh kiện</p>
              </S.InforItem>
            ) : (
              <S.InforItem span={14}>
                <p style={{ textAlign: "start", fontSize: 13 }}>
                  {valuesItem?.data.name}
                </p>

                <Space.Compact style={{ textAlign: "start", marginLeft: 30 }}>
                  {valuesItem?.quantity !== 1 ? (
                    <Button
                      onClick={() =>
                        dispatch(
                          updateItemBuildAction({
                            categoryId: valuesItem?.categoryId,
                            quantity: valuesItem?.quantity - 1,
                          })
                        )
                      }
                      icon={<MinusOutlined />}
                    />
                  ) : (
                    <Button
                      onClick={() =>
                        dispatch(
                          deleteItemBuildAction({
                            categoryId: valuesItem?.categoryId,
                          })
                        )
                      }
                      icon={<DeleteOutlined />}
                    />
                  )}
                  <Input
                    value={valuesItem?.quantity}
                    style={{
                      width: 40,
                      height: 32,
                    }}
                  />
                  <Button
                    onClick={() =>
                      dispatch(
                        updateItemBuildAction({
                          categoryId: valuesItem?.categoryId,
                          quantity: valuesItem?.quantity + 1,
                        })
                      )
                    }
                    icon={<PlusOutlined />}
                  />
                </Space.Compact>

                <S.PriceItem>
                  {(
                    valuesItem?.data.price * valuesItem?.quantity
                  ).toLocaleString()}
                  ₫
                </S.PriceItem>
              </S.InforItem>
            )}
            <Col
              span={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {findIndexBuildList === -1 ? (
                <S.ButtonShow onClick={() => handleShowProductList(item.id)}>
                  Chọn
                </S.ButtonShow>
              ) : (
                <S.ButtonShow onClick={() => handleShowProductList(item.id)}>
                  Sửa
                </S.ButtonShow>
              )}
            </Col>
          </Row>
        </S.CategoryBuildItemWrap>
      );
    });
  }, [categoryList.data, buildList]);

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      setCategoryId(item.categoryId);
      return (
        <S.ProductItem key={item.id}>
          <S.ImgProduct alt="logo" src={item.image} />
          <S.NameProduct>{item.name}</S.NameProduct>
          <S.PriceProduct>{item.price.toLocaleString()}₫</S.PriceProduct>
          <S.ButtonSelectProduct onClick={() => handleActiveItem(item)}>
            Chọn
          </S.ButtonSelectProduct>
        </S.ProductItem>
      );
    });
  }, [productList.data]);

  const handleShowProductList = (id) => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
        categoryId: id,
      })
    );
    setShowModal(true);
    console.log(id);
  };

  const handleBuildToCard = (key) => {
    for (let i = 0; i < buildList.length; i++) {
      dispatch(
        addToCartAction({
          id: buildList[i].data.id,
          product: {
            name: buildList[i].data.name,
            img: buildList[i].data.img,
          },
          price: buildList[i].data.price,
          quantity: buildList[i].quantity,
        })
      );
    }
    if (key === "toCart") {
      navigate(ROUTES.USER.CART_LIST);
    }
  };

  return (
    <S.BuildPCWrapper>
      {showModal ? (
        <S.ModalSelectItem onClick={() => setShowModal(false)}>
          <S.ModalContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.HeaderModal>
              <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={10}>
                  <Select
                    onChange={(value) => handleFilter("sort", value)}
                    placeholder="Sắp xếp theo"
                    style={{
                      display: "flex",
                    }}
                  >
                    <Select.Option value="price.asc">
                      Giá tăng dần
                    </Select.Option>
                    <Select.Option value="price.desc">
                      Giá giảm dần
                    </Select.Option>
                  </Select>
                </Col>
                <Col span={14}>
                  <Input
                    style={{ borderRadius: 30 }}
                    placeholder="Tìm linh kiện..."
                    onChange={(e) => handleFilter("searchKey", e.target.value)}
                  />
                </Col>
              </Row>
            </S.HeaderModal>

            <S.ModalProductList>{renderProductList}</S.ModalProductList>
          </S.ModalContainer>
        </S.ModalSelectItem>
      ) : null}

      <S.BuildPCContainer>
        <Row
          style={{ width: "100%", display: "flex", justifyContent: "start" }}
        >
          <S.HeaderBuildPC span={17}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              Cấu hình
            </div>
            <S.ButtonShow onClick={() => dispatch(deleteListBuildAction())}>
              Xóa tất cả
            </S.ButtonShow>
          </S.HeaderBuildPC>
        </Row>
        <S.BuildPCContent>
          <S.ListCategoriesWrapper span={17}>
            {renderCategoryBuildPC}
          </S.ListCategoriesWrapper>
          <S.AddCart span={7}>
            {buildList.length === 0 ? (
              <img src={EmptyCart} alt="empty" style={{ width: "100%" }} />
            ) : (
              <div style={{ marginTop: 20 }}>
                <div>
                  Chi phí dự tính :{" "}
                  <S.TotalPrice>
                    {totalPriceBuild?.toLocaleString()}₫
                  </S.TotalPrice>
                </div>
                <S.Buttom
                  onClick={() => handleBuildToCard("toCart")}
                  type="primary"
                >
                  MUA NGAY
                </S.Buttom>
                <S.Buttom onClick={() => handleBuildToCard("addCart")}>
                  THÊM VÀO GIỎ HÀNG
                </S.Buttom>
              </div>
            )}
          </S.AddCart>
        </S.BuildPCContent>
      </S.BuildPCContainer>
    </S.BuildPCWrapper>
  );
}

export default BuildPCPage;
