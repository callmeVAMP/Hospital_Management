import { createSlice } from "@reduxjs/toolkit";


const snackBarSclice=createSlice({
    name:"snackBarSclice",
    initialState:{
        message: '',
        severity: '',
        open: false
    },
    reducers:{
        setSnackBarInfo:(state,action)=>{
            return {...state,...action.payload};
        }
    }
})

export const {setSnackBarInfo}=snackBarSclice.actions;
export default snackBarSclice.reducer;