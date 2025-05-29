import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  channels: [],
  isLoading: false,
  error: null
};

// Async thunk for fetching sale channels
export const fetchSaleChannels = createAsyncThunk(
  'saleChannel/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/sale-channels');
      if (!response.ok) {
        throw new Error('Failed to fetch sale channels');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a sale channel
export const addSaleChannel = createAsyncThunk(
  'saleChannel/addChannel',
  async (channel, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/sale-channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(channel),
      });
      if (!response.ok) {
        throw new Error('Failed to add sale channel');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const saleChannelSlice = createSlice({
  name: 'saleChannel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch channels cases
      .addCase(fetchSaleChannels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSaleChannels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels = action.payload;
      })
      .addCase(fetchSaleChannels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to fetch sale channels');
      })
      // Add channel cases
      .addCase(addSaleChannel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSaleChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels.push(action.payload);
        toast.success('Sale channel added successfully!');
      })
      .addCase(addSaleChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to add sale channel');
      });
  },
});

export default saleChannelSlice.reducer; 