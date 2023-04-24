import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";
import Header from "../../layout/Header";
import { ROUTES } from "../../constants/routes";
import { loginAction } from "../../redux/action";

function LoginPage() {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: () => navigate(ROUTES.USER.HOME),
      })
    );
  };
  return (
    <>
      <Header />
      <S.LoginWrapper>
        <S.LoginContainer>
          <h2>Đăng nhập</h2>
          <Form
            form={loginForm}
            name="loginForm "
            layout="vertical"
            initialValues={{ remember: false }}
            onFinish={(values) => handleLogin(values)}
            autoComplete="off"
          >
            <Form.Item
              label="Email đăng nhập"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
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
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox style={{ display: "flex" }}>Remember me</Checkbox>
            </Form.Item>
            <div style={{ paddingBottom: "12px" }}>
              Nếu bạn chưa có tài khoản hãy đăng ký tài khoản để đặt mua hàng dễ
              dàng hơn.
              <Link to={generatePath(ROUTES.REGISTER)}> Đăng ký tài khoản</Link>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </S.LoginContainer>
      </S.LoginWrapper>
    </>
  );
}

export default LoginPage;
