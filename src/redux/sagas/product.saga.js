import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getProductListSaga(action) {
  try {
    const { page, limit, more, categoryId, seriesId, searchKey, sort } =
      action.payload;
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        _expand: "category",
        _page: page,
        _limit: limit,
        q: searchKey,
        seriesId,
        categoryId,
        ...(sort && {
          _sort: sort.split(".")[0],
          _order: sort.split(".")[1],
        }),
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        error: "loading",
      },
    });
  }
}

//SearchListSaga
function* getSearchListSaga(action) {
  try {
    const { page, limit, searchKey } = action.payload;
    console.log(
      "🚀 ~ file: product.saga.js:42 ~ function*getSearchListSaga ~ searchKey:",
      searchKey
    );
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        _page: page,
        _limit: limit,
        q: searchKey,
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_SEARCH_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
        },
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_SEARCH_LIST),
      payload: {
        error: "loading",
      },
    });
  }
}

//Detail

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;

    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: "favorites",
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "loading",
      },
    });
  }
}

//createProductSaga
function* createProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", data);
    yield callback();
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield debounce(
    300,
    REQUEST(PRODUCT_ACTION.GET_SEARCH_LIST),
    getSearchListSaga
  );
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
}
