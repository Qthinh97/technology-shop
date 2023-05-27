import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Card, Row, Col, Form } from "antd";

import { getCityListAction, updateUserInfoAction } from "../../../redux/action";

import * as S from "./styles";

function AccountPage() {
  const [AccountForm] = Form.useForm();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const initialValues = {
    id: userInfo.data.id,
    fullName: userInfo.data.name,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
    address: userInfo.data.address,
  };

  useEffect(() => {
    if (userInfo.data.id) {
      AccountForm.resetFields();
    }
  }, [userInfo.data]);

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  const handleSubmitAccountForm = (values) => {
    const { fullName, phoneNumber, address } = values;
    dispatch(
      updateUserInfoAction({
        id: initialValues.id,
        name: fullName,
        phoneNumber: phoneNumber,
        address: address,
      })
    );
  };

  return (
    <S.AccountWrapper>
      <S.AccountForm>
        <h2 style={{ margin: "0 0 24px" }}>Thay dổi thông tin</h2>
        <Form
          name="AccountForm"
          form={AccountForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleSubmitAccountForm(values)}
        >
          <Card
            size="small"
            title="Thông tin tài khoản"
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
