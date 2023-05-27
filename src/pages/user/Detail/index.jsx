import { Fragment, useEffect, useMemo } from "react";
import {
  Col,
  Row,
  notification,
  Form,
  Space,
  Rate,
  Button,
  Card,
  Input,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  getProductDetailAction,
  addToCartAction,
  getReviewListAction,
  favoriteProductAction,
  unFavoriteProductAction,
  sendReviewAction,
} from "../../../redux/action";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ROUTES } from "../../../constants/routes";
import { OTHER_INFO } from "./constants/other";

import * as S from "./styles";

function DetailPage() {
  const { id } = useParams();
  const [reviewForm] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);
  // REVIEW
  const averageRate = useMemo(
    () =>
      reviewList.data.length
        ? (
            reviewList.data.reduce((total, item) => total + item.rate, 0) /
            reviewList.data.length
          ).toFixed(1)
        : 0,
    [reviewList.data]
  );

  // isLike
  const isLike = useMemo(
    () =>
      productDetail.data.favorites?.findIndex(
        (item) => item.userId === userInfo.data.id
      ) !== -1,
    [productDetail.data.favorites, userInfo.data.id]
  );

  // isLike
  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        dispatch(
          unFavoriteProductAction({
            id: favoriteData.id,
            productId: productDetail.data.id,
          })
        );
      } else {
        dispatch(
          favoriteProductAction({
            productId: productDetail.data.id,
            userId: userInfo.data.id,
          })
        );
      }
    } else {
      notification.error({
        message: "Vui lòng đăng nhập để thực hiện chức năng này!",
      });
    }
  };
  // REVIEW
  const handleReview = (values) => {
    dispatch(
      sendReviewAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: parseInt(id),
        },
        callback: () => reviewForm.resetFields(),
      })
    );
  };

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <S.ReviewItemWrapper key={item.id}>
          <Space>
            <h3>{item.user.fullName}</h3>
            <span>{moment(item.createdAt).fromNow()}</span>
          </Space>
          <Rate
            value={item.rate}
            disabled
            style={{ display: "block", fontSize: 12 }}
          />
          <p>{item.comment}</p>
        </S.ReviewItemWrapper>
      );
    });
  }, [reviewList.data]);

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(getReviewListAction({ productId: id }));
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
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <S.DetailContent>
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

                <Space align="baseline">
                  <Rate value={averageRate} disabled />
                  <span>
                    {`(${
                      reviewList.data.length
                        ? `${reviewList.data.length} lượt đánh giá`
                        : "chưa có lượt đánh giá"
                    })`}
                  </span>
                </Space>

                <S.DetailPrice>
                  <div>{productDetail.data.price?.toLocaleString()} đ</div>
                </S.DetailPrice>

                <Button
                  size="large"
                  danger={isLike}
                  icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => handleToggleFavorite()}
                >
                  {productDetail.data?.favorites?.length || 0} liked
                </Button>

                <div style={{ marginTop: 24 }}>
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
          </Col>
          <S.PolicyDetail lg={6} xs={24}>
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
        </Row>
      </S.DetailContainer>

      <S.OtherInfoWrapper>
        <Row gutter={[16, 16]}>
          <Col lg={{ span: 16, order: 1 }} xs={{ span: 24, order: 2 }}>
            <S.OtherInfoContent>
              <h2 style={{ marginBottom: 16, marginTop: 0 }}>Mô tả sản phẩm</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetail.data.content,
                }}
              ></div>
            </S.OtherInfoContent>
          </Col>
          <Col lg={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
            <h2 style={{ marginBottom: 16, marginTop: 0 }}>
              Thông tin chi tiết
            </h2>
            <table>
              <tbody>{renderOtherInfo()}</tbody>
            </table>
          </Col>
        </Row>
      </S.OtherInfoWrapper>
      <Card
        title="Bình luận & nhận xét"
        size="small"
        bordered={false}
        style={{ marginTop: 16, width: "100%", maxWidth: 1232 }}
      >
        {userInfo.data.id && (
          <Form
            form={reviewForm}
            name="reviewForm"
            layout="vertical"
            onFinish={(values) => handleReview(values)}
            autoComplete="off"
            style={{ padding: 12, borderRadius: 6, background: "#f0f2f5" }}
          >
            <Form.Item
              label="Rate"
              name="rate"
              rules={[
                {
                  required: true,
                  message: "Please input your rate!",
                },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Comment"
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Please input your comment!",
                },
              ]}
            >
              <Input.TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 4,
                }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form>
        )}
        {renderReviewList}
      </Card>
    </S.DetailWrapper>
  );
}

export default DetailPage;
