import { Fragment, useEffect } from "react";
import { Col, Row, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetailAction, addToCartAction } from "../../../redux/action";
import { ROUTES } from "../../../constants/routes";
import { OTHER_INFO } from "./constants/other";

import * as S from "./styles";

function DetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));
  }, [id]);

  const handleAddToCart = (key) => {
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
    if (key === "buyNow") {
      navigate(ROUTES.USER.CART_LIST);
    }
  };

  // OTHER_INFO start
  const renderOtherInfo = () => {
    if (!productDetail.data.otherInfo) return null;
    return Object.keys(productDetail.data.otherInfo).map((key) => {
      return (
        <tr key={key}>
          <td style={{ minWidth: 130 }}>{OTHER_INFO[key]}</td>
          <td>{productDetail.data.otherInfo[key]}</td>
        </tr>
      );
    });
  };
  // OTHER_INFO end

  const renderSpecifications = () => {
    const specifications = productDetail.data.specifications?.split("/");
    return specifications?.map((item, idex) => {
      return (
        <Fragment key={idex}>
          <p style={{ lineHeight: 1.4 }}>{item}</p>
        </Fragment>
      );
    });
  };
  return (
    <S.DetailWrapper>
      <S.DetailContainer>
        <S.DetailContent span={18}>
          <S.DetailLeftContent>
            <S.DetailMainImage src={productDetail.data.image} />
            <S.DetailInfo>{renderSpecifications()}</S.DetailInfo>
          </S.DetailLeftContent>

          <S.DetailRightContent>
            <h2 style={{ marginTop: 0 }}>{productDetail.data.name}</h2>
            <S.Brand>
              <span style={{ color: "rgb(130, 134, 158)" }}>
                Thương hiệu :{" "}
              </span>
              {productDetail.data.brand}
            </S.Brand>
            <S.DetailPrice>
              <div>{productDetail.data.price?.toLocaleString()} đ</div>
            </S.DetailPrice>

            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <S.Buttom
                    onClick={() => handleAddToCart("buyNow")}
                    type="primary"
                  >
                    MUA NGAY
                  </S.Buttom>
                </Col>
                <Col span={12}>
                  <S.Buttom onClick={() => handleAddToCart("addCart")}>
                    THÊM VÀO GIỎ HÀNG
                  </S.Buttom>
                </Col>
              </Row>
            </div>

            <div>
              <h3>Khuyến mãi liên quan</h3>
              <li> Hỗ trợ trả góp với đơn hàng từ 3.000.000đ</li>
              <span>
                <br />
              </span>
              <li>Nhận voucher giảm 1.000.000đ cho đơn từ 20.000.000đ</li>
            </div>
          </S.DetailRightContent>
        </S.DetailContent>
        <S.PolicyDetail span={6}>
          <S.PolicyWrapper>
            <h3>Chính sách bán hàng</h3>
            <S.ContentPolicy>
              <S.PolicyIcon src="https://lh3.googleusercontent.com/GhNtpGgxXmX19ZMQbeaob5Ie-KlIMd1iG9Z3cvpEbw2Tfrs2AhdmPQlRebbVl-7UrPWzi-EBdc-ag4R_yPB6rM0PepmmdfaAqA=rw" />
              Miễn phí giao hàng cho đơn hàng từ 5 triệu
            </S.ContentPolicy>
            <S.ContentPolicy>
              <S.PolicyIcon src="https://lh3.googleusercontent.com/XmFALMc-5taoHeQmQHflGJeRh8cqmGPHyxXRTIf4TTleOZSV_2VGIp_VzRKyUFtgt3phLH6GJQFl6BsTL3B-H9ZU6zN4NYNR9g=rw" />
              Cam kết hàng chính hãng 100%
            </S.ContentPolicy>
            <S.ContentPolicy>
              <S.PolicyIcon src="https://lh3.googleusercontent.com/VA9UNdLuNEoZ0DGmgc9ZSKfaUpNlB7W0TQ4ACQl3_6JbKrz2UJpsSM1-1BhtnONTR_y-ZF5ofxXJ6yqjnWvRZtWr4B2IsFMC=rw" />
              Đổi trả trong vòng 10 ngày
            </S.ContentPolicy>
          </S.PolicyWrapper>
        </S.PolicyDetail>
      </S.DetailContainer>

      <S.OtherInfoWrapper>
        <S.OtherInfoContent span={16}>
          <h2 style={{ marginBottom: 16, marginTop: 0 }}>Mô tả sản phẩm</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: productDetail.data.content,
            }}
          ></div>
        </S.OtherInfoContent>
        <S.OtherInfoTable span={8}>
          <table>
            <thead>
              <th colspan="2">
                <h2 style={{ marginBottom: 16, marginTop: 0 }}>
                  Thông tin chi tiết
                </h2>
              </th>
            </thead>

            <tbody>{renderOtherInfo()}</tbody>
          </table>
        </S.OtherInfoTable>
      </S.OtherInfoWrapper>
    </S.DetailWrapper>
  );
}

export default DetailPage;
