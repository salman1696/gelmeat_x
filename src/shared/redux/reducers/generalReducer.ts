import {createSlice} from '@reduxjs/toolkit';
import {ROUTES} from '../../exporter';

interface State {
  authInitialRoute: string;
}

const initialState: State = {
  authInitialRoute: ROUTES.WELCOME,
};

export const generalReducer = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAuthInitialRoute: (state, action) => {
      state.authInitialRoute = action.payload;
    },
  },
});

export const {setAuthInitialRoute} = generalReducer.actions;

export default generalReducer.reducer;
