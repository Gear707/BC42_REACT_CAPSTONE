import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetSeats } from "../apis/bookingAPI";

// async actions
export const fetchAllSeats = createAsyncThunk("booking/fetch_seats", async (showtimeId) => {
    try {
        const data = await apiGetSeats(showtimeId);
        return data.content;
    } catch (error) {
        throw error.response?.data?.content;
    }
});

const initialState = {
    allSeats: null,
    selectedSeats: [],
    checkoutSeats: [],
    isLoading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addSeats: (state, action) => {
            // cập nhật danh sách ghế đang chọn
            const currentSeats = [...state.selectedSeats];
            // so sánh mã số ghế trong state và mã số ghế trong danh sách đang chọn
            let index = currentSeats.findIndex((seat) => seat.maGhe === action.payload.maGhe);
            if (index !== -1) {
                // nếu tìm thấy ghế trong danh sách đang chọn thì xóa đi
                currentSeats.splice(index, 1);
                return { ...state, selectedSeats: currentSeats };
            }
            else {
                // nếu chưa có thì thêm mới mã số ghế vào danh sách chọn
                const seats = [...currentSeats, action.payload];
                return { ...state, selectedSeats: seats };
            }
        },
        // deleteSeats: (state, action) => {
        //     const seats = state.selectedSeats.filter((seat) => seat.maGhe !== action.number);
        //     return { ...state, selectedSeats: seats };
        // },
        checkoutSelectedSeats: (state, action) => {
            const seatsToCheckout = [...state.selectedSeats];
            const updatedSeats = [...state.checkoutSeats, ...seatsToCheckout];
            return { ...state, selectedSeats: [], checkoutSeats: updatedSeats };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllSeats.pending, (state) => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(fetchAllSeats.fulfilled, (state, action) => {
            return { ...state, isLoading: false, allSeats: action.payload };
        });
        builder.addCase(fetchAllSeats.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message };
        });
    }
});

export const { addSeats, deleteSeats, checkoutSelectedSeats } = bookingSlice.actions;

export default bookingSlice.reducer;