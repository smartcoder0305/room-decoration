import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import orderThisWeekReducer from "./orderThisWeekSlice";
import orderThisMonthReducer from "./orderThisMonthSlice";
import customerReducer from "./customerSlice";
console.log('yooooo')
const store=configureStore({
    reducer:{
        order:orderReducer,
        orderWeek:orderThisWeekReducer,
        orderMonth:orderThisMonthReducer,
        customer:customerReducer
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ]
})

export default store;