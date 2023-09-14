import productsService from "../products/productsService";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Error {
  message: string;
}

interface ProductsState {
  productList: ProductType[];
  error: string | null;
  loading: boolean;
}

const initialState: ProductsState = {
  productList: [],
  error: null,
  loading: false,
};

// Async thunk action to fetch products
export const getProducts = createAsyncThunk(
  'product-list/getAll',
  async (_, thunkAPI) => {
    try {
      return await productsService.fetchProducts();
    } catch (err) {
      // TypeAssertions to ensure the type of the error message
      return thunkAPI.rejectWithValue((err as Error).message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsList: (state, action: PayloadAction<ProductType[]>) => {
      state.productList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productList = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        // TypeAssertions to ensure the type of the state error message
        state.error = (action.payload as Error).message;
      });
  },
});

export const { setProductsList } = productsSlice.actions;

export default productsSlice.reducer;