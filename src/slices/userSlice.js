import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSignin } from "../apis/userAPI";

// async actions
export const signin = createAsyncThunk("user/signin", async (values) => {
    try {
        const data = await apiSignin(values);
        return data.content;
    } catch (error) {
        throw error.response?.data?.content;
    }
});

// let userInfo = {};
// if (localStorage.getItem("userList")) {
//     userInfo = JSON.parse(localStorage.getItem("userList"));
// };

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state) => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            // localStorage.setItem("userList", JSON.stringify(action.payload));
            return { ...state, isLoading: false, user: action.payload };
        });
        builder.addCase(signin.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message };
        });
    }
});

export default userSlice.reducer;