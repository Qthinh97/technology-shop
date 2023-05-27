import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";

import { changePasswordAction } from "../../../redux/action";

function ChangePassword() {
  const [changePasswordForm] = Form.useForm();

  const { userInfo, changePasswordData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changePasswordData.error) {
      changePasswordForm.setFields([
        {
          name: "password",
          errors: ["Mật khẩu đã tồn tại!"],
        },
      ]);
    }
  }, [changePasswordData.error]);

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordAction({
        id: userInfo.data.id,
        data: {
          email: userInfo.data.email,
          password: values.password,
          newPassword: values.newPassword,
        },
        callback: () => changePasswordForm.resetFields(),
      })
    );
  };

  return (
    <Form
      form={changePasswordForm}
      name="changePasswordForm"
      layout="vertical"
      onFinish={(values) => handleChangePassword(values)}
      autoComplete="off"
      style={{ width: "30%" }}
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Bạn phải nhập mật khẩu!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Bạn phải nhập mật khẩu mới!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm new password"
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: "Nhập lại mật khẩu là bắt buộc!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Mật khẩu mới và nhập lại mật khẩu không trùng khớp!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        loading={changePasswordData.load}
      >
        Submit
      </Button>
    </Form>
  );
}

export default ChangePassword;
