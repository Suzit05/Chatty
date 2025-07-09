import { create } from "zustand"

export const useChatStore = create(set)=> ({
    messges: [],
    users: [],
    selectedUsers: null,
    isUsersLoading: false,
    isMessageLoading: false,


    //yha se continue kro.....
})