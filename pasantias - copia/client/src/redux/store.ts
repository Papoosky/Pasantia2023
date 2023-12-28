import userSliceReducer  from './states/user.ts';
import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models";

// definir el tipo de estado de la aplicacion 
export interface AppStore{
    user: UserInfo;
}
// configurar el store de redux
export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer
    }
})