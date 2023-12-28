import { createSlice } from "@reduxjs/toolkit";
import {UserInfo } from "../../models";

// usuario vacio para inicializar el estado
export const EmpyUserState: UserInfo = {
    id: 0,
    name: '',
    email: '',
    role: '',
}

// persistencia en local storage
export const persistLocalStorageUser : any = (userInfo: UserInfo) => {
    localStorage.setItem('user', JSON.stringify({... userInfo}));
}
// limpiar local storage
export const clearLocalStorageUser = () => {
    localStorage.removeItem('user');
}
// slice de redux para el estado de usuario 
export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : EmpyUserState,
    reducers: {
        createUser: (state, action) => {
            persistLocalStorageUser(action.payload);
            return action.payload;
        },
        updateUser: (state, action) => {
            const result = {...state, ...action.payload};
            persistLocalStorageUser(result);
            return result;
        },
        resetUser: () => {
            clearLocalStorageUser();
            return EmpyUserState;
        }
        
    }
})

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;