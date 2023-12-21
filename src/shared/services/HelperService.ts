import Toast from 'react-native-toast-message';
import {
  ROUTES,
  setAuthInitialRoute,
  setAuthToken,
  setUser,
  store,
} from '../exporter';

export const showToast = (text1: string, text2: string, type: boolean) => {
  Toast.show({text1, text2, type: type ? 'success' : 'error'});
};

export const addLeadingZero = (val: any) => {
  return val < 10 ? `0${val}` : val;
};

export const errorHandler = (err: any) => {
  const {authInitialRoute} = store.getState().root.general;
  if (err.response.status === 403) {
    if (authInitialRoute === ROUTES.WELCOME) {
      store.dispatch(setAuthInitialRoute(ROUTES.LOGIN));
    }
    store.dispatch(setAuthToken(null));
    store.dispatch(setUser(null));
  } else {
    showToast('Error', err?.response.data?.message, false);
  }
};
