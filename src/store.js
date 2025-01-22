import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import formBuilderReducer from './features/FormBuilderSlice';



export const store = configureStore({
  reducer: { auth: authReducer },
  formBuilder: formBuilderReducer,
});
