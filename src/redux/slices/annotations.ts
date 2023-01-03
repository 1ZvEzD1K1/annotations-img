import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getAnnotations = createAsyncThunk(
  "annotations/getAnnotations",
  async (_, { getState, rejectWithValue }) => {
    try {
      const request: AxiosResponse = await axios.get(
        "http://localhost:3000/annotations"
      );

      if (request.status === 200) {
        return request.data;
      } else {
        throw new Error("Get error");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const postAnnotations = createAsyncThunk(
  "annotations/postAnnotations",
  async (
    { id, author, comment, pos }: TAnnotationState,
    { getState, rejectWithValue }
  ) => {
    try {
      const request: AxiosResponse = await axios.post(
        "http://localhost:3000/annotations",
        { id, author, comment, pos }
      );

      if (request.status === 201) {
        return request.data;
      } else {
        throw new Error("Post error");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAnnotations = createAsyncThunk(
  "annotations/deleteAnnotations",
  async ( id: string, { getState, rejectWithValue }) => {
    try {
      const request: AxiosResponse = await axios.delete(
        `http://localhost:3000/annotations/${id}`
      );

      if (request.status === 200) {
        return id;
      } else {
        throw new Error("Delete error");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export type TAnnotationState = {
  id: string;
  author: string;
  comment: string;
  pos: {
    x: number;
    y: number;
  };
};

export type TAnnotationsState = {
  annotations: TAnnotationState[] | [];
  error: string | null;
  loading: boolean;
};

const initialState: TAnnotationsState = {
  annotations: [],
  loading: false,
  error: null,
};

const annotationsSlice = createSlice({
  name: "annotations",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAnnotations.pending.toString()]: (state: TAnnotationsState) => {
      state.loading = true;
      state.error = null;
    },
    [getAnnotations.fulfilled.toString()]: (
      state: TAnnotationsState,
      action
    ) => {
      state.loading = false;
      state.annotations = action.payload;
    },
    [getAnnotations.rejected.toString()]: (
      state: TAnnotationsState,
      action
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [postAnnotations.pending.toString()]: (state: TAnnotationsState) => {
      state.loading = true;
      state.error = null;
    },
    [postAnnotations.fulfilled.toString()]: (
      state: TAnnotationsState,
      action
    ) => {
      state.loading = false;
      state.annotations = [...state.annotations, action.payload];
    },
    [postAnnotations.rejected.toString()]: (
      state: TAnnotationsState,
      action
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteAnnotations.pending.toString()]: (state: TAnnotationsState) => {
      state.loading = true;
      state.error = null;
    },
    [deleteAnnotations.fulfilled.toString()]: (
      state: TAnnotationsState,
      action
    ) => {
      state.loading = false;
      state.annotations = state.annotations.filter(el => el.id !== action.payload);
    },
    [deleteAnnotations.rejected.toString()]: (
      state: TAnnotationsState,
      action
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default annotationsSlice.reducer;
