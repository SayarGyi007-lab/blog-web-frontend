import * as z from "zod"
import { registerSchema } from "../../schema/user/Register.Schmea"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../slices/userApi"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock, Image as ImageIcon } from "lucide-react"

type FormInputs = z.infer<typeof registerSchema>

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(registerSchema),
  })

  const [registerMutation, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const submit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)

    const fileInput = (document.getElementById("profileImageUrl") as HTMLInputElement)?.files?.[0]
    if (fileInput) {
      formData.append("profileImageUrl", fileInput)
    }

    try {
      await registerMutation(formData).unwrap()
      reset()
      toast.success("Registration Success")
      navigate("/login")
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 overflow-hidden">
      
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Join us and start your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                {...register("name")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Your Name"
              />
            </div>
            {errors.name && (
              <span className="text-red-600 text-sm font-medium">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register("email")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <span className="text-red-600 text-sm font-medium">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="password"
                {...register("password")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <span className="text-red-600 text-sm font-medium">{errors.password.message}</span>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="file"
                id="profileImageUrl"
                accept="image/*"
                className="block w-full text-sm text-gray-600 pl-10
                           file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 
                           file:text-sm file:font-medium file:bg-indigo-600 file:text-white 
                           hover:file:bg-indigo-700 transition"
              />
            </div>
            {errors.profileImageUrl && (
              <span className="text-red-600 text-sm font-medium">{errors.profileImageUrl.message}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold 
                       shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting || isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
