import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  categoryList: {
    data: [],
    load: false,
    error: "",
    categoryId: "",
  },
  categoryDetail: { data: [], load: false, error: "" },
};

const categoryReducer = createReducer(initialState, {
  GET_CATEGORY_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        load: true,
      },
    };
  },

  GET_CATEGORY_LIST_SUCCESS: (state, action) => {
    const { data, categoryId } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data,
        load: false,
        categoryId,
      },
    };
  },

  GET_CATEGORY_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        load: false,
        error,
      },
    };
  },
});

export default categoryReducer;
