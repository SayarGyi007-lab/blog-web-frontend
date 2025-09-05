import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseUrl = 
    import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL


export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const userInfo = localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo")!)
              : null;
            if (userInfo?.token) {
              headers.set("Authorization", `Bearer ${userInfo.token}`);
            }
            return headers;
          },
    }),
    endpoints: () => ({}),
    
})
