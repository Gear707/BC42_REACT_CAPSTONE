import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSignin } from "../apis/userAPI";
import { alertError, alertSuccess } from "../apis/sweetAlert2";

// async actions
export const signin = createAsyncThunk("user/signin", async (values) => {
  try {
    const data = await apiSignin(values);
    // Lưu thông tin user vào localStorage để giữ trạng thái đăng nhập
    localStorage.setItem("user", JSON.stringify(data.content));
    alertSuccess("Đăng nhập thành công");
    return data.content;
  } catch (error) {
    alertError("Đăng nhập thất bại");
    throw error.response?.data?.content;
  }
});

const initialState = {
  // Đồng bộ thông tin user từ localStorage vào state của redux
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signout: (state) => {
      return { ...state, user: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      return { ...state, isLoading: true, error: null };
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      return { ...state, isLoading: false, user: action.payload };
    });
    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
  },
});

export const { signout } = userSlice.actions;

export default userSlice.reducer;
