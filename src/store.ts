import { configureStore } from '@reduxjs/toolkit';
import userSlice from './states/userSlice';

const store = configureStore(
    {
        reducer: {
            user: userSlice,
        },
    }
);
export default store;
