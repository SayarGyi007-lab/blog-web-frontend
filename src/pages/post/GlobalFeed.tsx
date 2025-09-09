import { useState, useEffect } from "react";
import { useGlobalFeedQuery, useLikePostMutation } from "../../slices/postApi";
import axios from "axios";
import { toast } from "react-toastify";
import { Heart, FileText } from "lucide-react";

let API_URL=""
if(import.meta.env.VITE_MODE==="development"){
    API_URL = import.meta.env.VITE_LOCAL_API_URL
}
if(import.meta.env.VITE_MODE==="production"){
    API_URL = import.meta.env.VITE_API_URL
}

function GlobalFeed() {
  const { data: postsData, isLoading, isError, error } = useGlobalFeedQuery();
  const [likePost] = useLikePostMutation();

  const [localPosts, setLocalPosts] = useState(postsData || []);
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (postsData) setLocalPosts(postsData);
  }, [postsData]);

  if (isLoading) return <p className="text-center animate-pulse text-gray-500">Loading posts...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error: {JSON.stringify(error)}
      </p>
    );

  const handleLike = async (postId: string) => {
    setLocalPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? { ...post, likes: [...(post.likes || []), { _id: "temp", name: "You" }] }
          : post
      )
    );

    try {
      await likePost(postId).unwrap();
    } catch (err) {
      console.error("Failed to like post:", err);
      setLocalPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes?.filter((l) => l._id !== "temp") }
            : post
        )
      );
    }
  };

  const handleSummarize = async (postId: string, text: string) => {
    if (summaries[postId]) return;
    try {
      const res = await axios.post(`${API_URL}/api/summarize`, {
        text,
        summary_length: "medium",
        output_language: "en",
      });
      setSummaries((prev) => ({ ...prev, [postId]: res.data.summary }));
    } catch (err: any) {
      toast.error("Failed to summarize");
    }
  };

  return (
    <div className="relative min-h-screen py-6 px-4 bg-gradient-to-br from-indigo-100 via-white to-pink-100 overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center z-10 relative">🌍 Global Feed</h1>

      {localPosts && localPosts.length > 0 ? (
        <div className="space-y-6 relative z-10">
          {localPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition"
            >
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <h2 className="text-xl font-semibold text-gray-900 truncate">{post.title || "Untitled Post"}</h2>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700">
                  {post.visibility}
                </span>
              </div>

          
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

              
              {post.postImageUrl && post.postImageUrl?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {post.postImageUrl.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="post"
                      className="rounded-xl w-full h-48 object-cover shadow-sm hover:scale-105 transition"
                    />
                  ))}
                </div>
              )}

              
              {post.tag && post.tag?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tag.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs bg-indigo-50 px-3 py-1 rounded-full text-indigo-600 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-gray-600">
                <span className="font-medium">👤 {post.post_author?.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Heart className="w-4 h-4" /> {post.likes?.length || 0}
                  </button>

                  <button
                    onClick={() => handleSummarize(post._id, post.content || "")}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    <FileText className="w-4 h-4" />
                    {summaries[post._id] ? "Summarized" : "Summarize"}
                  </button>
                </div>
              </div>

              
              {summaries[post._id] && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-800 italic border-l-4 border-indigo-400">
                  {summaries[post._id]}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 relative z-10">No posts yet.</p>
      )}
    </div>
  );
}

export default GlobalFeed;
