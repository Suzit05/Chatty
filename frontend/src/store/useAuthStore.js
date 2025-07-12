import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({ //ek state hai jo set m initial and updated value se khelta hia
    //initial state
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check") //from the backend 
            // , pura url isliyr nhi likhe hai qk ..axios m baseurl daal diye hai
            set({ authUser: res.data })

        }
        catch (error) {
            console.log("error in useAuthstore", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data) //url m data bheja jaa rha
            set({ authUser: res.data }) //authuser avi jo user signup hua , wo ho jaega
            toast.success("Account created successfully");


        }
        catch (error) {
            toast.error(error.response.data.message) //validate form m bna diye hai
        }
        finally {
            set({ isSigningUp: false })  //wps false kr do
        }


    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("login successfully!!")
        }
        catch (error) {
            toast.error(error.response.data.message)

        }
        finally {
            set({ isLoggingIn: false })
        }


    },

    logout: async (data) => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logout successfully")
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {

            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data })
            toast.success("Profile updated successfully")

        }
        catch (error) {
            toast.error(error.response.data.message)
            console.log("error in update profile", error)
        }
        finally {
            set({ isUpdatingProfile: false })
        }
    }


}))