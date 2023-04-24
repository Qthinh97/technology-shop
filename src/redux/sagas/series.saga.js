import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getSeriesListSaga(action) {
  try {
    const { categoryId } = action.payload;
    const result = yield axios.get("http://localhost:4000/series", {
      params: {
        categoryId,
      },
    });
    yield put({
      type: "GET_SERIES_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_SERIES_LIST_FAIL",
      payload: {
        error: "loading",
      },
    });
  }
}

export default function* seriesSaga() {
  yield takeEvery("GET_SERIES_LIST_REQUEST", getSeriesListSaga);
}
