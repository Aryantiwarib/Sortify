import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO: add more slices here for posts
    }
});

export default store;



/*
NOTES:

USER OF STORE:=>
The Redux store is the central location where the entire application's state is stored and managed. It acts like a big container that holds data and allows different parts of the application to access or modify it.


*/