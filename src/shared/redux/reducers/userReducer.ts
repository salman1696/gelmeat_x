import { createSlice } from '@reduxjs/toolkit';

interface State {
  user: any;
  authToken: any;
  cartItems: any;
  rItems: any;
  lang: any;
  currentRoute: string;
  selectedLocation: any
}

const initialState: State = {
  user: null,
  authToken: null,
  cartItems: [],
  rItems: [],
  lang: '',
  currentRoute: '',
  selectedLocation: ''
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRItems: (state, action) => {
      state.rItems = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const {
  setRItems,
  setUser,
  setAuthToken,
  setCartItems,
  setLang,
  setCurrentRoute,
  setCurrentLocation
} = userReducer.actions;

export default userReducer.reducer;
