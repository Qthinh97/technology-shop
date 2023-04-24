import * as S from "./styles";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";

import { getCategoryAction } from "../../redux/action";
import { ROUTES } from "../../constants/routes";

function Sidebar() {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getCategoryAction({
        page: 1,
      })
    );
  }, []);

  const renderCategorySidebar = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col key={item.id} span={24}>
          <S.CategoryLink
            value={item.id}
            to={generatePath(ROUTES.USER.PRODUCT_BY_CATEGORY, {
              categoryId: item.id,
            })}
          >
            {item.name}
          </S.CategoryLink>
        </Col>
      );
    });
  }, [categoryList.data]);

  return (
    <S.Sidebar>
      <S.CustomCard>
        <S.HeaderCard>Danh mục sản phẩm</S.HeaderCard>
        {renderCategorySidebar}
      </S.CustomCard>
    </S.Sidebar>
  );
}

export default Sidebar;
