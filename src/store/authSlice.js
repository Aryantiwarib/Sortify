import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    status:false,
    userData:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,

    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData = action.payload.userData;
        },
        logout:(state,action)=>{
            state.status=fase;
            state.userData = null;
        }

    }
    
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;





/* NOTES 

Initial state – Defines the default values for the slice.
Reducers – Functions that modify the state based on actions.
Actions – Functions that dispatch specific changes to the store.


In Redux, state refers to the data stored in the central store, while actions are objects that describe how the state should change.



State	Stores user details and isAuthenticated status.
Action	login(userData) updates state with user info.
Action	logout() clears user data and sets isAuthenticated to false.
Reducer	Defines how state changes based on dispatched actions.

*/