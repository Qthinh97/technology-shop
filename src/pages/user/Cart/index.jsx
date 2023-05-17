import { Button, Input, Table, Space } from "antd";
import { useState } from "react";

import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import {
  updateCartItemAction,
  deleteCartItemAction,
  deleteCartListAction,
} from "../../../redux/action";

import { ROUTES } from "../../../constants/routes";
import EmptyCart from "../../../assets/images/logo/empty_cart.png";

import * as S from "./styles";

function CartPage() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const [deleteID, setDeleteId] = useState("");

  const handleDeleteNotice = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItemAction(deleteID));
    setShowModal(false);
  };

  const handleDeleteCartList = () => {
    dispatch(deleteCartListAction());
    setShowModal(false);
  };

  const { cartList } = useSelector((state) => state.cart);

  const cartTotalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const columns = [
    {
      title: "Sản Phẩm",
      dataIndex: "product",
      key: "product",
      render: (product, item) => (
        <S.Product to={generatePath(ROUTES.USER.DETAIL, { id: item.id })}>
          <S.ImgCartItem src={product.img} />
          <div>{product.name}</div>
        </S.Product>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <h3>{price.toLocaleString()}₫</h3>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, item) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 100,
            justifyContent: "center",
          }}
        >
          <Space.Compact>
            <Button
              onClick={() =>
                dispatch(
                  updateCartItemAction({
                    id: item.id,
                    quantity: quantity > 1 ? quantity - 1 : 1,
                  })
                )
              }
              icon={<MinusOutlined />}
            />
            <Input
              value={quantity}
              style={{
                width: 40,
                height: 32,
              }}
            />
            <Button
              onClick={() =>
                dispatch(
                  updateCartItemAction({
                    id: item.id,
                    quantity: quantity + 1,
                  })
                )
              }
              icon={<PlusOutlined />}
            />
          </Space.Compact>
          <Button
            style={{
              marginTop: 10,
              color: "#1435c3",
              border: "transparent",
            }}
            onClick={() => handleDeleteNotice({ id: item.id })}
          >
            Xóa
          </Button>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) => (
        <h3 cl>{(item.price * item.quantity).toLocaleString()}₫</h3>
      ),
    },
  ];

  return (
    <S.CartWrapper>
      {showModal ? (
        <S.ModalDeleteWrapper onClick={() => setShowModal(false)}>
          <S.ModalDelete
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1>Chú ý</h1>
            <S.ButtonClose size="large" onClick={() => setShowModal(false)}>
              X
            </S.ButtonClose>

            {deleteID !== undefined ? (
              <p>Bạn muốn xoá sản phẩm này ra khỏi giỏ hàng?</p>
            ) : (
              <p>Bạn muốn xoá tất cả sản phẩm ra khỏi giỏ hàng?</p>
            )}

            <S.ButtonGroup>
              <S.ButtonModal onClick={() => setShowModal(false)}>
                Hủy bỏ
              </S.ButtonModal>
              {deleteID !== undefined ? (
                <S.ButtonModal
                  type="primary"
                  onClick={() => handleDeleteCartItem()}
                >
                  Đồng ý
                </S.ButtonModal>
              ) : (
                <S.ButtonModal
                  type="primary"
                  onClick={() => handleDeleteCartList()}
                >
                  Đồng ý
                </S.ButtonModal>
              )}
            </S.ButtonGroup>
          </S.ModalDelete>
        </S.ModalDeleteWrapper>
      ) : null}

      {cartList.length !== 0 ? (
        <div
          style={{
            width: "100%",
          }}
        >
          <S.HeaderWrapper>
            <S.HeaderCart span={16}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                Giỏ hàng
              </div>
              <Button type="primary" onClick={() => handleDeleteNotice()}>
                Xóa tất cả
              </Button>
            </S.HeaderCart>
          </S.HeaderWrapper>
          <S.CartContentWrapper gutter={[16, 16]}>
            <S.CartContent span={16}>
              <Table
                columns={columns}
                dataSource={cartList}
                rowKey="id"
                pagination={false}
              />
            </S.CartContent>

            <S.CartPaymentWrapper span={8}>
              <S.CartPromotion>
                <S.HeaderAddPromotion>
                  <h3
                    style={{
                      margin: 0,
                    }}
                  >
                    Khuyến mãi
                  </h3>

                  <S.AddPromotion>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      size="18"
                      class="css-ymxljd"
                      color="white"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.19499 3C5.99608 3 5.80532 3.07902 5.66466 3.21967L3.21967 5.66466C3.07902 5.80532 3 5.99608 3 6.19499V11.085C3 11.2839 3.07902 11.4747 3.21967 11.6153L12.3884 20.784C12.6813 21.0769 13.1562 21.0769 13.4491 20.784L17.1166 17.1166L20.784 13.4491C21.0769 13.1562 21.0769 12.6813 20.784 12.3884L11.6153 3.21967C11.4747 3.07902 11.2839 3 11.085 3H6.19499ZM4.5 6.50565L6.50565 4.5H10.7743L19.1931 12.9187L16.0559 16.0559L12.9187 19.1931L4.5 10.7743V6.50565ZM7.86186 9.2514C7.86186 8.65286 8.34707 8.16765 8.94561 8.16765C9.54415 8.16765 10.0294 8.65286 10.0294 9.2514C10.0294 9.84994 9.54415 10.3351 8.94561 10.3351C8.34707 10.3351 7.86186 9.84994 7.86186 9.2514ZM8.94561 6.66765C7.51865 6.66765 6.36186 7.82444 6.36186 9.2514C6.36186 10.6784 7.51865 11.8351 8.94561 11.8351C10.3726 11.8351 11.5294 10.6784 11.5294 9.2514C11.5294 7.82444 10.3726 6.66765 8.94561 6.66765ZM11.3097 12.9996C11.0168 12.7067 10.5419 12.7067 10.249 12.9996C9.95613 13.2925 9.95613 13.7674 10.249 14.0603L12.3884 16.1996C12.6813 16.4925 13.1562 16.4925 13.449 16.1996C13.7419 15.9067 13.7419 15.4319 13.449 15.139L11.3097 12.9996ZM12.694 10.5545C12.9869 10.2616 13.4618 10.2616 13.7547 10.5545L15.8941 12.6939C16.187 12.9868 16.187 13.4616 15.8941 13.7545C15.6012 14.0474 15.1263 14.0474 14.8334 13.7545L12.694 11.6151C12.4011 11.3223 12.4011 10.8474 12.694 10.5545Z"
                        fill="#82869E"
                      ></path>
                    </svg>
                    <div
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Chọn hoặc nhập khuyến mãi
                    </div>
                  </S.AddPromotion>
                </S.HeaderAddPromotion>
                <div
                  style={{
                    textAlign: "start",
                  }}
                >
                  Đơn hàng chưa đủ điều kiện áp dụng khuyến mãi. Vui lòng mua
                  thêm để áp dụng
                </div>
              </S.CartPromotion>
              <S.CartPayment>
                <h3>Tổng tiền</h3>
                <S.TotalMoney>
                  <p>Tổng tạm tính</p>
                  <p>{cartTotalPrice.toLocaleString()}₫</p>
                </S.TotalMoney>
                <S.TotalMoney>
                  <p>Thành tiền</p>
                  <div
                    style={{
                      textAlign: "end",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#1435c3",
                      }}
                    >
                      {cartTotalPrice.toLocaleString()}₫
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      (Đã bao gồm VAT)
                    </p>
                  </div>
                </S.TotalMoney>
                <S.ButtonPayment
                  size="large"
                  onClick={() => navigate(ROUTES.USER.CHECKOUT)}
                >
                  TIẾP TỤC
                </S.ButtonPayment>
              </S.CartPayment>
            </S.CartPaymentWrapper>
          </S.CartContentWrapper>
        </div>
      ) : (
        <S.CartEmptyWrapper>
          <S.CartEmpty>
            <img src={EmptyCart} />
            <p>Giỏ hàng chưa có sản phẩm nào</p>
            <Button
              onClick={() => navigate(ROUTES.USER.HOME)}
              size="large"
              style={{
                backgroundColor: "rgb(20, 53, 195)",
                color: "#fff",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              Mua sắm ngay
            </Button>
          </S.CartEmpty>
        </S.CartEmptyWrapper>
      )}
    </S.CartWrapper>
  );
}

export default CartPage;
