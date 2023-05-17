import { createAction } from "@reduxjs/toolkit";
import { PRODUCT_ACTION, REQUEST } from "../constants";

export const getProductListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)
);

export const getProductDetailAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)
);

export const getSearchListAction = createAction(
  REQUEST(PRODUCT_ACTION.GET_SEARCH_LIST)
);

export const clearSearchListAction = createAction(
  REQUEST(PRODUCT_ACTION.CLEAR_SEARCH_LIST)
);

export const createProductAction = createAction(
  REQUEST(PRODUCT_ACTION.CREATE_PRODUCT)
);
export const updateProductAction = createAction(
  REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT)
);
export const deleteProductAction = createAction(
  REQUEST(PRODUCT_ACTION.DELETE_PRODUCT)
);
