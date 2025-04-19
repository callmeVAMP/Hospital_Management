import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from "./authSlice";
import snackBarSliceReducer from "./snackbarSlice"

export default configureStore({
  reducer: {
    authKey:authSliceReducer,
    snackBarKey:snackBarSliceReducer
  },
})