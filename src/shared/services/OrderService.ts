import { HTTP_CLIENT } from "../exporter";

export const getOrderById = (id: string) => {
  return HTTP_CLIENT.get(`order/${id}`);
};

export const createOrder = (params: any) => {
  return HTTP_CLIENT.post(`order`, params);
};

export const updateOrder = (id: string, params: any) => {
  return HTTP_CLIENT.put(`order/${id}`, params);
};

export const downloadInvoice = (id: string) => {
  return HTTP_CLIENT.get(`invoice/${id}`);
};

export const orderReport = (query: string) => {
  return HTTP_CLIENT.get(`order-report${query}`);
};

export const areaOrder = (params: any) => {
  return HTTP_CLIENT.post(`area-order`, params);
};


export const getOrder = (params: any, id: any) => {
  console.log(params, id, 'loogo');

  let url = '/order';
  if (id) {
    url = `/order/${id}`;
  }
  console.log(url);

  return HTTP_CLIENT.get(url, { params });
};

export const placeOrder = (params: any) => {
  return HTTP_CLIENT.post('order', params);
};

export const markFav = (params: any) => {
  return HTTP_CLIENT.post('favorite', params);
};

export const removeFav = (params: { id: any; }) => {
  return HTTP_CLIENT.delete(`favorite/${params.id}`);
};

export const getFav = () => {
  return HTTP_CLIENT.get(`favorite`);
};

export const updateProfile = (id: any, params: any) => {
  return HTTP_CLIENT.put(`user/${id}`, params);
};

export const getOffers = () => {
  return HTTP_CLIENT.get(`discount-offer?latest=true`);
};

// address api's
export const getAddresses = (params: any) => {
  return HTTP_CLIENT.get(`address`, params);
};

export const addAddress = (params: any) => {
  return HTTP_CLIENT.post(`address`, params);
};

export const updateAddress = (id: any, params: any) => {
  return HTTP_CLIENT.put(`address/${id}`, params);
};

export const deleteAddress = (id: any, params: any) => {
  return HTTP_CLIENT.put(`address/${id}`, params);
};




///cards api
export const getCards = (params: any) => {
  return HTTP_CLIENT.get(`card`, params);
};
export const addCard = (params: any) => {
  return HTTP_CLIENT.post(`card`, params);
};
export const updateCard = (id: any, params: any) => {
  return HTTP_CLIENT.put(`card/${id}`, params);
};
export const deleteCard = (id: any, params: any) => {
  return HTTP_CLIENT.put(`card/${id}`, params);
};


//
export const getDiscountOffers = (params: any) => {
  return HTTP_CLIENT.get(`discount-offer?latest=true`, params);
};

//
export const verifyPromo = (params: any) => {
  return HTTP_CLIENT.post(`verify-coupon`, params);
};
