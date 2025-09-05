import * as z from "zod"

export const CreatePostSchema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    tag: z.string().nonempty(),
    visibility: z.string().nonempty(),
    postImageUrl: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length <= 10,
      "You can upload up to 10 photos only"
    ),
})