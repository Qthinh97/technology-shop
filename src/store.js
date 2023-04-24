import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./redux/reducers/products.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import seriesReducer from "./redux/reducers/series.reducer";
import authReducer from "./redux/reducers/auth.reducer";

import createSagaMiddleware from "redux-saga";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    series: seriesReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
