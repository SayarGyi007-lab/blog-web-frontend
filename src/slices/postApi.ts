import { apiSlice } from "./api";

interface Post{
    _id: string;
    title?: string;
    content?: string;
    tag?: string[];
    post_author: {
      _id: string;
      name: string;
      email: string;
    };
    visibility: "public" | "private";
    likes: { _id: string; name: string }[];
    shared_from?: Post | string;
    share_caption?: string;
    postImageUrl?: string[];
    
}

interface UpdatePostInput {
    id: string;
    title?: string;
    content?: string;
    tag?: string[];
    visibility?: "public" | "private";
    postImageUrl?: string[];
}

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createPost: builder.mutation<Post, FormData>({
            query: (data) => ({
              url: "/post/create",
              method: "POST",
              body: data,
              credentials: "include"
            }),
          }),
        deletePost: builder.mutation<{ message: string }, string>({
            query:(id)=>({
                url:`/post/delete/${id}`,
                method: "DELETE"
            })
        }),
        getPostById: builder.query<Post, string>({
            query: (id) => `/post/${id}`,
        }),
        updatePost: builder.mutation<Post,UpdatePostInput>({
            query:(id,...data)=>({
                url:`/post/${id}`,
                method: "PUT",
                body: data
            })
        }),
        globalFeed: builder.query<Post[], void>({
                query: ()=> '/'
        }),
        likePost: builder.mutation<Post, string>({
            query:(id)=>({
                url:`/post/${id}/like`,
                method: "PUT",
            })
        })

    })

})

export const {useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation, useGetPostByIdQuery, useGlobalFeedQuery, useLikePostMutation } = postApiSlice