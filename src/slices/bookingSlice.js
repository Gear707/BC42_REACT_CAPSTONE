import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCheckout, apiGetSeats } from "../apis/bookingAPI";

// async actions
export const fetchAllSeats = createAsyncThunk("booking/fetchAllSeats", async (bookingId) => {
    try {
        const data = await apiGetSeats(bookingId);
        return data.content;
    } catch (error) {
        throw error.response?.data?.content;
    }
});

export const checkout = createAsyncThunk("booking/checkout", async (checkoutData) => {
    try {
        const { bookingId, selectedSeats } = checkoutData;
        const data = await apiCheckout(bookingId, selectedSeats);
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
            const currentSeats = [...state.selectedSeats];
            let index = currentSeats.findIndex((seat) => seat.maGhe === action.payload.maGhe);
            if (index !== -1) {
                currentSeats.splice(index, 1);
                return { ...state, selectedSeats: currentSeats };
            }
            else {
                const seats = [...currentSeats, action.payload];
                return { ...state, selectedSeats: seats };
            }
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
        builder.addCase(checkout.pending, (state) => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(checkout.fulfilled, (state) => {
            if (state.selectedSeats.length === 0) {
                return { ...state, isLoading: false, error: "Vui lòng chọn ghế" };
            }

            const updatedSeats = [...state.checkoutSeats, ...state.selectedSeats];

            return { ...state, isLoading: false, selectedSeats: [], checkoutSeats: updatedSeats };
        });
        builder.addCase(checkout.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message };
        });
    }
});

export const { addSeats } = bookingSlice.actions;

export default bookingSlice.reducer;