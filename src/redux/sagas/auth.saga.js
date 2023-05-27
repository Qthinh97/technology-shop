import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield callback(result.data.user.role);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data,
      },
    });
    notification.success({
      message: "Đăng nhập thành công",
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: "email hoặc password không đúng",
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/register", data);
    yield callback();
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    notification.success({
      message: "Đăng ký tài khoản thành công",
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: "Lỗi!",
      },
    });
  }
}

function* updateInfoSaga(action) {
  try {
    const { id, name, phoneNumber, address } = action.payload;

    const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
      name,
      phoneNumber,
      address,
    });
    yield put({
      type: SUCCESS(AUTH_ACTION.UPDATE_USER_INFO),
      payload: {
        name: result.name,
        phoneNumber: result.phoneNumber,
        address: result.address,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.UPDATE_USER_INFO),
      payload: {
        error: "Lỗi!",
      },
    });
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("http://localhost:4000/login", {
      email: data.email,
      password: data.password,
    });
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: data.newPassword,
    });
    callback();
    notification.success({
      message: "Đổi mật khẩu thành công",
      placement: "bottomRight",
    });
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        error: "Lỗi!",
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.UPDATE_USER_INFO), updateInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga);
}
