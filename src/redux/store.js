import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { defaultReducer } from "./reducers/defaultReducer";

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ["default"],
};

const rootReducer = combineReducers({
  default: defaultReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);

export { store, persistor };
