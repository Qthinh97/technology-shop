import { useEffect, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { Card, Row, Col, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";
import { getFavoriteListAction } from "../../../redux/action";

import * as S from "./styles";

function FavoriteProducts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(
        getFavoriteListAction({
          userId: userInfo.data.id,
        })
      );
    }
  }, [userInfo.data.id]);

  const renderProductList = useMemo(() => {
    return favoriteList.data.map((item) => {
      return (
        <div key={item.id}>
          <S.ProductItem>
            <S.ImgProduct alt="logo" src={item.product.image} />
            <S.NameProduct
              to={generatePath(ROUTES.USER.DETAIL, {
                id: item.product.id,
              })}
            >
              {item.product.name}
            </S.NameProduct>
            <S.PriceProduct>
              {item.product.price.toLocaleString()}₫
            </S.PriceProduct>
          </S.ProductItem>
        </div>
      );
    });
  }, [favoriteList.data]);

  return (
    <Spin spinning={favoriteList.load}>
      <Row gutter={[16, 16]}>{renderProductList}</Row>
    </Spin>
  );
}

export default FavoriteProducts;
