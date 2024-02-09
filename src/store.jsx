import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./Features/NavigationSlice";
import { useState } from "react";
import AdminNavigationReducer from "./Features/AdminNavigationSlice";
import AuthReducer from "./Features/AuthSlice";
import TargetAudienceReducer from "./Features/TargetAudienceSlice";
import CategoryReducer from "./Features/CategorySlice";
import EventReducer from "./Features/EventSlice";
import SessionReducer from "./Features/SessionSlice";
const store = configureStore({
  reducer: {
    NavigationReducer,
    AdminNavigationReducer,
    AuthReducer,
    TargetAudienceReducer,
    CategoryReducer,
    EventReducer,
    SessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
