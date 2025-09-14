import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import leadsReducer from "./features/leadsSlice";

export default configureStore({
    reducer: {
        auth :authReducer,
        leads :leadsReducer
    },

}
);