import * as S from "./styles";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";

import { getCategoryAction } from "../../redux/action";
import { ROUTES } from "../../constants/routes";

function Footer() {
  return (
    <S.FooterWrapper>
      <S.PolicyFooter>
        <Row gutter={[12, 12]}>
          <Col lg={5} md={8} sm={12} xs={24}>
            <S.HeaderPolicy>Hỗ trợ Khách hàng</S.HeaderPolicy>
            <S.ContentFooter>Thẻ ưu đãi</S.ContentFooter>
            <S.ContentFooter>Hướng dẫn mua hàng online</S.ContentFooter>
            <S.ContentFooter>Ưu đãi dành cho doanh nghiệp</S.ContentFooter>
            <S.ContentFooter>Chính Sách trả góp</S.ContentFooter>
          </Col>
          <Col lg={5} md={8} sm={12} xs={24}>
            <S.HeaderPolicy>Chính sách mua hàng</S.HeaderPolicy>
            <S.ContentFooter>Chính sách bảo hành</S.ContentFooter>
            <S.ContentFooter>Chính sách đổi trả</S.ContentFooter>
            <S.ContentFooter>Chính sách thanh toán</S.ContentFooter>
            <S.ContentFooter>Giao hàng và lắp đặt tạ nhà</S.ContentFooter>
          </Col>
          <Col lg={5} md={8} sm={12} xs={24}>
            <S.HeaderPolicy>Thông tin cửa hàng</S.HeaderPolicy>
            <S.ContentFooter>Giới thiệu Tech Store</S.ContentFooter>
            <S.ContentFooter>Hệ thống cửa hàng</S.ContentFooter>
            <S.ContentFooter>Trung tâm bảo hành</S.ContentFooter>
            <S.ContentFooter>Chính Sách bảo mật</S.ContentFooter>
            <S.ContentFooter>Tin công nghệ</S.ContentFooter>
          </Col>
          <Col lg={5} md={8} sm={12} xs={24}>
            <S.HeaderPolicy>Cộng đồng Tech Store</S.HeaderPolicy>
            <S.ContentFooter>Gọi mua hàng (miễn phí) 18006867</S.ContentFooter>
            <S.ContentFooter>Gọi chăm sóc 18006865</S.ContentFooter>
            <S.ContentFooter>
              <FacebookOutlined style={{ marginRight: 8 }} />
              Tech Store
            </S.ContentFooter>
            <S.ContentFooter>
              <YoutubeOutlined style={{ marginRight: 8 }} />
              Tech Store Media
            </S.ContentFooter>
          </Col>
          <Col lg={4} md={8} sm={12} xs={24}>
            <S.HeaderPolicy>Email liên hệ</S.HeaderPolicy>
            <S.ContentFooter>Hỗ trợ Khách hàng:</S.ContentFooter>
            <S.ContentFooter>techstore@gmail.com</S.ContentFooter>
            <S.ContentFooter>Liên hệ báo giá:</S.ContentFooter>
            <S.ContentFooter>techstore@gmail.com</S.ContentFooter>
            <S.ContentFooter>Hợp tác phát triển:</S.ContentFooter>
            <S.ContentFooter>techstore@gmail.com</S.ContentFooter>
          </Col>
        </Row>
      </S.PolicyFooter>
    </S.FooterWrapper>
  );
}

export default Footer;
