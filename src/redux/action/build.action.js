import { createAction } from "@reduxjs/toolkit";
import { BUILD_ACTION, REQUEST } from "../constants";

export const addItemBuildAction = createAction(
  REQUEST(BUILD_ACTION.ADD_ITEM_PRODUCT)
);

export const updateItemBuildAction = createAction(
  REQUEST(BUILD_ACTION.UPDATE_ITEM_PRODUCT)
);

export const deleteItemBuildAction = createAction(
  REQUEST(BUILD_ACTION.DELETE_ITEM_PRODUCT)
);

export const deleteListBuildAction = createAction(
  REQUEST(BUILD_ACTION.DELETE_LIST_PRODUCT)
);
