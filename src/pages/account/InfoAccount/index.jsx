import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Card, Row, Col, Select, Form } from "antd";

import { PRODUCT_LIMIT } from "../../../constants/paging";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateUserInfoAction,
} from "../../../redux/action";

import * as S from "./styles";

function AccountPage() {
  const [AccountForm] = Form.useForm();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

  const initialValues = {
    fullName: userInfo.data.name,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
  };

  useEffect(() => {
    if (userInfo.data.id) {
      AccountForm.resetFields();
    }
  }, [userInfo.data]);

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

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

  const handleSubmitAccountForm = (values) => {
    const { cityCode, districtCode, wardCode, fullName, phoneNumber } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
    // dispatch(
    //   orderProductAction({
    //     data: {
    //       ...values,
    //       cityName: cityData?.name,
    //       districtName: districtData?.name,
    //       wardName: wardData?.name,
    //       userId: userInfo.data.id,
    //     },
    //   })
    // );
    dispatch(
      updateUserInfoAction({
        data: {
          name: fullName,
          phoneNumber: phoneNumber,
        },
      })
    );
  };

  return (
    <S.AccountWrapper>
      <S.AccountForm>
        <h2 style={{ margin: "0 0 24px" }}>Thủ tục thanh toán</h2>
        <Form
          name="AccountForm"
          form={AccountForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleSubmitAccountForm(values)}
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
                  <Input disabled />
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
                      AccountForm.setFieldsValue({
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
                      AccountForm.setFieldsValue({
                        wardCode: undefined,
                      });
                    }}
                    disabled={!AccountForm.getFieldValue("cityCode")}
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
                  <Select disabled={!AccountForm.getFieldValue("districtCode")}>
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

          <Row justify="end">
            <Button size="large" htmlType="submit">
              Cập nhật
            </Button>
          </Row>
        </Form>
      </S.AccountForm>
    </S.AccountWrapper>
  );
}

export default AccountPage;
