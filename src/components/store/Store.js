import {configureStore} from "@reduxjs/toolkit"
import AddMain from "./reducer/AddMain"
import reducerFavourite from "./reducer/Favourites"

export default configureStore({
    reducer: {
        korzinkaSavat: AddMain,
        reducerFavourite: reducerFavourite
    }
})