import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { messagesReducer } from "./slices/messages/messagesSlice";
import { postsReducer } from "./slices/posts/postsSlice";
import { searchReducer } from "./slices/search/searchSlice";
import { usersReducer } from "./slices/users/usersSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const ignoreEmptyComments = (store) => (next) => (action) => {
    if (action.type === 'posts/addComment' && !action.payload.body.replaceAll(' ', '')) {
        return
    }
    next(action)
}

const CapsLockNot = (store) => (next) => (action) => {
    if(action.type === 'search/toggleSearch' ){
        action.payload = action.payload.toLowerCase()
    }
     next(action) 
} 

const persistConfig = {
    key: 'fantastikinstagram',
    storage,
}

const rootReducer = combineReducers({
    posts: postsReducer,
    search: searchReducer,
    users: usersReducer,
    messages: messagesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlewares) => {
        return [...getDefaultMiddlewares({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }), ignoreEmptyComments, CapsLockNot]
    }
})

// export const persistor = persistStore(store)

export default store;