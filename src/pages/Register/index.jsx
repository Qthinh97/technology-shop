import { useEffect, useMemo } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, generatePath, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import { ROUTES } from "../../constants/routes";
import { registerAction } from "../../redux/action";

function RegisterPage() {
  const [registerForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerData } = useSelector((state) => state.auth);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.error],
        },
      ]);
    }
  }, [registerData.error]);

  const handleRegister = (values) => {
    dispatch(
      registerAction({
        data: {
          name: values.name,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
          role: "user",
        },
        callback: () => navigate(ROUTES.LOGIN),
      })
    );
  };

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <Header />
      <S.RegisterWrapper>
        <S.RegisterContainer>
          <h2>Đăng ký</h2>
          <Form
            form={registerForm}
            name="registerForm "
            layout="vertical"
            onFinish={(values) => handleRegister(values)}
            autoComplete="off"
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Mời bạn nhập tên của mình!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập số điện thoại!",
                },
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Số điện thoại đăng nhập phải đúng cú pháp!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email đăng ký"
              name="email"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Mời bạn nhập email đăng ký!",
                },
                {
                  type: "email",
                  message: "Email đăng ký không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Mật khẩu yếu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu bạn vừa nhập không trùng khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ paddingBottom: "12px" }}>
              Nếu bạn đã có tài khoản.
              <Link to={generatePath(ROUTES.LOGIN)}> Đăng nhập</Link>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </S.RegisterContainer>
      </S.RegisterWrapper>
      <Footer />
    </>
  );
}

export default RegisterPage;
