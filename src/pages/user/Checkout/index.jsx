import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Form,
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Card,
  Space,
  Table,
  Checkbox,
} from "antd";

import { ROUTES } from "../../../constants/routes";
import { PRICE_SHIP, PRICE_TECHNIQUE } from "../../../constants/price";
import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  orderProductAction,
  deleteCartListAction,
} from "../../../redux/action";

import * as S from "./styles";

function CheckoutPage() {
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otherPrice, setOtherPrice] = useState({
    t: false,
    s: false,
  });

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { cartList } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const initialValues = {};

  const cartTotalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleAddPrice = ([key], e) => {
    setOtherPrice({
      ...otherPrice,
      [key]: e.target.checked,
    });
  };

  const checkoutTotalPrice =
    cartTotalPrice +
    (cartTotalPrice <= 5000000 ? 55000 : 0) +
    (otherPrice.t === true && cartTotalPrice <= 5000000 ? PRICE_TECHNIQUE : 0);

  const tableColumn = [
    {
      title: "Sản Phẩm",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <S.Product>
          <S.ImgCartItem src={product.img} />
          <div style={{ maxWidth: 500 }}>{product.name}</div>
        </S.Product>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
  ];

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  const handleSubmitCheckoutForm = (values) => {
    const checkoutTotalPrice =
      cartTotalPrice +
      (cartTotalPrice <= 5000000 ? 55000 : 0) +
      (otherPrice.t === true && cartTotalPrice <= 5000000
        ? PRICE_TECHNIQUE
        : 0);

    const { cityCode, districtCode, wardCode } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
    dispatch(
      orderProductAction({
        data: {
          ...values,
          cityName: cityData?.name,
          districtName: districtData?.name,
          wardName: wardData?.name,
          userId: userInfo.data.id,
          totalPrice: checkoutTotalPrice,
          status: "pending",
        },
        products: cartList,
        callback: () => navigate(ROUTES.USER.HOME),
      })
    );
    dispatch(deleteCartListAction());
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  if (cartList.length === 0) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <S.CheckoutWrapper>
      <h2 style={{ marginBottom: 24 }}>Thủ tục thanh toán</h2>
      <Card size="small" title="Giỏ hàng" style={{ marginBottom: 24 }}>
        <Table
          size="small"
          columns={tableColumn}
          dataSource={cartList}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <S.OtherOption>
        <Checkbox
          style={{ fontSize: 16 }}
          onChange={(e) => handleAddPrice("t", e)}
        >
          Hỗ trợ kỹ thuật tận nơi
        </Checkbox>
        <S.Price>
          {cartTotalPrice <= 5000000
            ? `${PRICE_TECHNIQUE.toLocaleString()}₫`
            : "Miễn phí"}
        </S.Price>
      </S.OtherOption>

      <S.OtherOption>
        <Checkbox
          style={{ fontSize: 16 }}
          onChange={(e) => handleAddPrice("s", e)}
        >
          Lắp đặt
        </Checkbox>
        <S.Price>Miễn phí</S.Price>
      </S.OtherOption>

      <S.CartPaymentWrapper>
        <S.CartPayment>
          <h3>Tổng tiền</h3>
          <S.TotalMoney>
            <p>Tổng tạm tính</p>
            <S.Price>{cartTotalPrice.toLocaleString()}₫</S.Price>
          </S.TotalMoney>
          {cartTotalPrice <= 5000000 ? (
            <S.TotalMoney>
              <p>Phí vận chuyển</p>
              <S.Price>{PRICE_SHIP.toLocaleString()}₫</S.Price>
            </S.TotalMoney>
          ) : null}

          {otherPrice.t ? (
            <S.TotalMoney>
              <p>Hỗ trợ kỹ thuật tận nơi</p>
              <S.Price>
                {cartTotalPrice <= 5000000
                  ? `${PRICE_TECHNIQUE.toLocaleString()}₫`
                  : "Miễn phí"}
              </S.Price>
            </S.TotalMoney>
          ) : null}

          {otherPrice.s ? (
            <S.TotalMoney>
              <p>Lắp đặt</p>
              <S.Price>Miễn phí</S.Price>
            </S.TotalMoney>
          ) : null}

          <S.TotalMoney>
            <p>Thành tiền</p>
            <div
              style={{
                textAlign: "end",
              }}
            >
              <S.Price
                style={{
                  fontSize: 20,
                  color: "red",
                }}
              >
                {checkoutTotalPrice.toLocaleString()}₫
              </S.Price>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                (Đã bao gồm VAT)
              </p>
            </div>
          </S.TotalMoney>
        </S.CartPayment>
      </S.CartPaymentWrapper>

      <Form
        name="checkoutForm"
        form={checkoutForm}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => handleSubmitCheckoutForm(values)}
      >
        <Card
          size="small"
          title="Thông tin giao hàng"
          style={{ marginBottom: 24 }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tỉnh/Thành"
                name="cityCode"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Select
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    checkoutForm.setFieldsValue({
                      districtCode: undefined,
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderCityOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quận/Huyện"
                name="districtCode"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Select
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    checkoutForm.setFieldsValue({
                      wardCode: undefined,
                    });
                  }}
                  disabled={!checkoutForm.getFieldValue("cityCode")}
                >
                  {renderDistrictOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phường/Xã"
                name="wardCode"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Select disabled={!checkoutForm.getFieldValue("districtCode")}>
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          size="small"
          title="Thông tin thanh toán"
          style={{ marginBottom: 24 }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[{ required: true, message: "Required!" }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="atm">Thanh toán qua VNPAY-QR</Radio>
                    <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Row justify="space-between">
          <Button size="large" onClick={() => navigate(ROUTES.USER.CART_LIST)}>
            Trở lại
          </Button>
          <S.ButtonPayment size="large" htmlType="submit">
            Thanh toán
          </S.ButtonPayment>
        </Row>
      </Form>
    </S.CheckoutWrapper>
  );
}

export default CheckoutPage;
