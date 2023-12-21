import { createSlice } from "@reduxjs/toolkit";

interface State {
  getOrderRes: any;
  createOrderRes: any;
  updateOrderRes: any;
  downloadInvoiceRes: any;
  orderReportRes: any;
  areaOrderRes: any;
}

const initialState: State = {
  getOrderRes: null,
  createOrderRes: null,
  updateOrderRes: null,
  downloadInvoiceRes: null,
  orderReportRes: null,
  areaOrderRes: null,
};

export const userReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    setGetOrderRes: (state, action) => {
      state.getOrderRes = action.payload;
    },
    setCreateOrderRes: (state, action) => {
      state.createOrderRes = action.payload;
    },
    setUpdateOrderRes: (state, action) => {
      state.updateOrderRes = action.payload;
    },
    setDownloadInvoiceRes: (state, action) => {
      state.downloadInvoiceRes = action.payload;
    },
    setOrderReportRes: (state, action) => {
      state.orderReportRes = action.payload;
    },
    setAreaOrderRes: (state, action) => {
      state.areaOrderRes = action.payload;
    },
  },
});

export const {
  setGetOrderRes,
  setCreateOrderRes,
  setUpdateOrderRes,
  setDownloadInvoiceRes,
  setOrderReportRes,
  setAreaOrderRes,
} = userReducer.actions;

export default userReducer.reducer;
