import { createReducer } from "@reduxjs/toolkit";

import { BUILD_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  buildList: JSON.parse(localStorage.getItem("buildList")) || [],
};

const buildPCReducer = createReducer(initialState, {
  // ADD_ITEM_PRODUCT
  [REQUEST(BUILD_ACTION.ADD_ITEM_PRODUCT)]: (state, action) => {
    const { categoryId, data, quantity } = action.payload;
    const newBuildList = [...state.buildList];

    const existIndex = state.buildList.findIndex(
      (item) => item.categoryId === categoryId
    );
    if (existIndex !== -1) {
      newBuildList.splice(existIndex, 1, action.payload);
    } else {
      newBuildList.push(action.payload);
    }

    localStorage.setItem("buildList", JSON.stringify(newBuildList));
    return {
      ...state,
      buildList: newBuildList,
    };
  },

  //UPDATE_ITEM_PRODUCT
  [REQUEST(BUILD_ACTION.UPDATE_ITEM_PRODUCT)]: (state, action) => {
    const { categoryId, data, quantity } = action.payload;
    const newBuildList = [...state.buildList];
    const existIndex = state.buildList.findIndex(
      (item) => item.categoryId === categoryId
    );
    newBuildList.splice(existIndex, 1, {
      ...state.buildList[existIndex],
      quantity,
    });
    localStorage.setItem("buildList", JSON.stringify(newBuildList));
    return {
      ...state,
      buildList: newBuildList,
    };
  },

  //DELETE_ITEM_PRODUCT
  [REQUEST(BUILD_ACTION.DELETE_ITEM_PRODUCT)]: (state, action) => {
    const { categoryId } = action.payload;
    const newBuildList = state.buildList.filter(
      (item) => item.categoryId !== categoryId
    );
    localStorage.setItem("buildList", JSON.stringify(newBuildList));
    return {
      ...state,
      buildList: newBuildList,
    };
  },

  //DELETE_CART_LIST
  [REQUEST(BUILD_ACTION.DELETE_LIST_PRODUCT)]: (state, action) => {
    const newBuildList = [];
    localStorage.setItem("buildList", JSON.stringify(newBuildList));
    return {
      ...state,
      buildList: newBuildList,
    };
  },
});

export default buildPCReducer;
