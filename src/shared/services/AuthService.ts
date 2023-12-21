import { ENDPOINTS, HTTP_CLIENT } from '../exporter';

export const signUp = (params: any) => {
  return HTTP_CLIENT.post('/auth/signup', params);
};

export const signIn = (params: string) => {
  return HTTP_CLIENT.post('auth/login', params);
};
export const addFCMToken = (params: any) => {
  return HTTP_CLIENT.post('fcm-token', params);
};

export const getAccessToekn = (params: any) => {
  return HTTP_CLIENT.post('auth/refresh', params);
};
export const getCat = () => {
  return HTTP_CLIENT.get('category');
};


export const getNotifications = () => {
  return HTTP_CLIENT.get('category');
};

export const forgotPassword = (params: any) => {
  return HTTP_CLIENT.post('auth/forget-password', params);
};