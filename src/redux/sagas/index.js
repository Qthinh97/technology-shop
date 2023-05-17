import { fork } from "redux-saga/effects";

import authSaga from "./auth.saga";
import productSaga from "./product.saga";
import categorySaga from "./categories.saga";
import seriesSaga from "./series.saga";
import orderSaga from "./order.saga";
import locationSaga from "./location.saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(seriesSaga);
  yield fork(orderSaga);
  yield fork(locationSaga);
}
