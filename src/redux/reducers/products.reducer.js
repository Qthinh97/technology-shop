import { createReducer } from "@reduxjs/toolkit";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    load: false,
    error: "",
  },
  productDetail: { data: [], load: false, error: "" },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        load: true,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, more, params } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: more ? [...state.productList.data, ...data] : data,
        load: false,
        meta,
      },
    };
  },

  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        load: false,
        error,
      },
    };
  },

  GET_PRODUCT_DETAIL: (state, action) => {
    console.log("GET_PRODUCT_DETAIL");

    return {
      ...state,
    };
  },
});

export default productReducer;
