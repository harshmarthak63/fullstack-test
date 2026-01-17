import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        selectedUser: undefined
    },
    reducers: {
        addUser: (state, action) => {
            state.users.push({
                id: action.payload._id,
                text: action.payload.name
            });
        },
        initialLoad: (state, action) => {
            action.payload.forEach(function(user){
                state.users.push({
                id: user._id,
                text: user.name
            });
            });
        },
        updateUser: () => { },
        deleteUser: (state, action) => {
            //debugger
            state.users = state.users.filter((item) => {
                if (item.id != action.payload.id) {
                    return item;
                }
            });

            if (state.selectedUser?.text === action.payload.text) {
                state.selectedUser = undefined;
            }
        },

        setSelectedUser: (state, action) => {
            var selectedUserObj = undefined;

            state.users.forEach(function(user){
                if(user.text == action.payload){
                    selectedUserObj = user;
                }
            });
            state.selectedUser = selectedUserObj;
        }
    }
});

export const { addUser, deleteUser, setSelectedUser, initialLoad } = userSlice.actions;
export default userSlice.reducer;
