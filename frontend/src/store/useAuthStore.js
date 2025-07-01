import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set) => ({ //ek state hai jo set m initial and updated value se khelta hia
    //initial state
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = axiosInstance.get("/auth/check") //from the backend 
            // , pura url isliyr nhi likhe hai qk ..axios m baseurl daal diye hai
            set({ authUser: res.data })

        }
        catch (error) {
            console.log("error in useAuthstore", error)
            set({ authUser: res.null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {

    }
}))