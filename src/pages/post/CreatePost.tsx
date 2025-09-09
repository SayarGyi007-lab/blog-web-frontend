import * as z from "zod"
import { CreatePostSchema } from "../../schema/post/CreatePost.Schema"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreatePostMutation } from "../../slices/postApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FileImage, FileText, Tag, Eye } from "lucide-react"

type FormInputs = z.infer<typeof CreatePostSchema>

function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(CreatePostSchema),
  })

  const [createPostMutation, { isLoading }] = useCreatePostMutation()
  const navigate = useNavigate()

  const submit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("tag", data.tag)
    formData.append("content", data.content)
    formData.append("visibility", data.visibility)

    const files = Array.from(data.postImageUrl as FileList)
    files.forEach((photo) => formData.append("postImageUrl", photo))

    try {
      await createPostMutation(formData).unwrap()
      reset()
      navigate("/")
      toast.success("Post uploaded successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 overflow-hidden">
     
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

     
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Create Post ✍️</h2>
        <p className="text-center text-gray-600 mt-2">Share your thoughts with the world</p>

        <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-5">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                {...register("title")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter post title"
              />
            </div>
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              {...register("content")}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm resize-y 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Write your content here..."
            />
            {errors.content && <p className="text-red-600 text-sm">{errors.content.message}</p>}
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
            <div className="relative">
              <Tag className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                {...register("tag")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="e.g. tech, life"
              />
            </div>
            {errors.tag && <p className="text-red-600 text-sm">{errors.tag.message}</p>}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
            <div className="relative">
              <Eye className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <select
                {...register("visibility")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="">Select visibility</option>
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
              </select>
            </div>
            {errors.visibility && <p className="text-red-600 text-sm">{errors.visibility.message}</p>}
          </div>

        
          <div>
            <label htmlFor="postImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Photos (max 10)
            </label>
            <div className="relative">
              <FileImage className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="file"
                id="postImageUrl"
                multiple
                accept="image/*"
                {...register("postImageUrl")}
                className="block w-full text-sm text-gray-600 pl-10
                 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 
                 file:text-sm file:font-medium file:bg-indigo-600 file:text-white 
                 hover:file:bg-indigo-700 transition"
              />
            </div>
            {errors.postImageUrl && (
              <span className="text-red-600 text-sm font-medium">
                {errors.postImageUrl.message as any}
              </span>
            )}
          </div>


     
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold 
                       shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting || isLoading ? "Submitting..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
