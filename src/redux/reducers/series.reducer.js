import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  seriesList: {
    data: [],
    load: false,
    error: "",
    seriesId: "",
  },
  seriesDetail: { data: [], load: false, error: "" },
};

const seriesReducer = createReducer(initialState, {
  GET_SERIES_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      seriesList: {
        ...state.seriesList,
        load: true,
      },
    };
  },

  GET_SERIES_LIST_SUCCESS: (state, action) => {
    const { data, seriesId } = action.payload;
    return {
      ...state,
      seriesList: {
        ...state.seriesList,
        data,
        load: false,
        seriesId,
      },
    };
  },

  GET_SERIES_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      seriesList: {
        ...state.seriesList,
        load: false,
        error,
      },
    };
  },
});

export default seriesReducer;
