import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';


import customFetch from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
const disptach = useDispatch;
const initialState = {
    isLoading : false,
    user : null,
};



const authSlice = createSlice({
    name : "auth",
    initialState,
});


export default authSlice.reducer;