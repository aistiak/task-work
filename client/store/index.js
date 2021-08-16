import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./rootReducer"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'nextjs',
    storage: storage,
    // persisting reducers ['reducerName']
    whitelist: [

    ],
  };
  
const middleware = [thunk]

const makeStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)