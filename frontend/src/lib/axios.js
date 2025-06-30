//fetch k jgh axios use kr rhe hai

import axios from "axios";

export const axiosInstance = axios.create({ //global state management library
    baseURL: "http://localhost:5001/api", //backend url
    withCredentials: true,
})