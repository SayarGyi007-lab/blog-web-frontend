import { apiSlice } from "./api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImageUrl?: string;
}

interface LoginInputs {
  email: string;
  password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data:LoginInputs) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<User,FormData>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
        query:()=>({
            url: "logout",
            method: "POST"
        })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApiSlice;
