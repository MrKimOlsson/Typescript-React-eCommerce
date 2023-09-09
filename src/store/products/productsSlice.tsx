import productsService from "../products/productsService";
import { ProductType } from '../../utils/types/product';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// export const addProduct = createAsyncThunk(
//   'product-list/add',
//   async (productData: ProductType, thunkAPI) => {
//     try {
//       return await productsService.createProduct(productData);
//     } catch (err) {
//       return thunkAPI.rejectWithValue((err as Error).message);
//     }
//   }
// );

export const getProducts = createAsyncThunk(
  'product-list/getAll',
  async (_, thunkAPI) => {
    try {
      return await productsService.fetchProducts();
    } catch (err) {
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

// export const productsSlice = createSlice({
//   name: 'product-list',
//   initialState,
//   reducers: {
//     setProductList: (state, action) => {
//       state.productList = action.payload;
//     },
//   },
  extraReducers: (builder) => {
    builder
      // .addCase(addProduct.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(addProduct.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.productList.push(action.payload);
      // })
      // .addCase(addProduct.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = (action.payload as Error).message;
      // })
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
        state.error = (action.payload as Error).message;
      });
  },
});

export const { setProductsList } = productsSlice.actions;

export default productsSlice.reducer;