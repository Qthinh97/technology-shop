import { useEffect } from "react";
import { Col, Row, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetailAction, addToCartAction } from "../../../redux/action";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

function DetailPage() {
  const { id } = useParams();
  console.log("🚀 ~ file: index.jsx:10 ~ DetailPage ~ i:", id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { productDetail } = useSelector((state) => state.product);
  const img = productDetail.data.image;
  console.log("🚀 ~ file: index.jsx:18 ~ DetailPage ~ img:", img);

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        id: productDetail.data.id,
        product: {
          name: productDetail.data.name,
          img: productDetail.data.image,
        },
        price: productDetail.data.price,
        quantity: 1,
      })
    );
    notification.success({
      message: "Thêm vào giỏ hàng thầnh công",
    });
  };

  const handleBuyNow = () => {
    navigate(ROUTES.USER.CART_LIST);
    dispatch(
      addToCartAction({
        id: productDetail.data.id,
        product: {
          name: productDetail.data.name,
          img: productDetail.data.image,
        },
        price: productDetail.data.price,
        quantity: 1,
      })
    );
    notification.success({
      message: "Thêm vào giỏ hàng thầnh công",
    });
  };

  return (
    <S.DetailWrapper>
      <S.DetailContent>
        <S.DetailLeftContent>
          <S.DetailMainImage src={productDetail.data.image} />
          <S.DetailInfo>dfdsf</S.DetailInfo>
        </S.DetailLeftContent>

        <S.DetailRightContent>
          <h2 style={{ marginTop: 0 }}>{productDetail.data.name}</h2>
          <S.Brand>
            <span style={{ color: "rgb(130, 134, 158)" }}>Thương hiệu:</span>{" "}
            {productDetail.data.brand}
          </S.Brand>
          <S.DetailPrice>
            <div>{productDetail.data.price?.toLocaleString()} đ</div>
          </S.DetailPrice>

          <div style={{ marginTop: 0 }} />

          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <S.Buttom onClick={handleBuyNow} type="primary">
                  MUA NGAY
                </S.Buttom>
              </Col>
              <Col span={12}>
                <S.Buttom onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</S.Buttom>
              </Col>
            </Row>
          </div>
        </S.DetailRightContent>
      </S.DetailContent>
    </S.DetailWrapper>
  );
}

export default DetailPage;
