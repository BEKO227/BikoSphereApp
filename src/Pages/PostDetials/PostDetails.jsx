import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import default_avatar from "../../../src/assets/default-profile.png";
import notFoundImg from "../../../src/assets/Image_not_available.png";
import PostOptions from "../../Components/PostOptions/PostOptions";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getPostDetails();
  }, []);

  async function getPostDetails() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setPost(data.post);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return <p className="text-center mt-10">Post not found.</p>;
  }

  const { body, image, user, createdAt, comments } = post;
  const { name, photo } = user || {};

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 my-5">

      {/* Post */}
      <div className="my-4 w-3/4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mx-auto">
        <div className="flex flex-col sm:flex-row items-start gap-4 p-4">
          {/* Avatar */}
          <img
            src={photo || default_avatar}
            alt="Author avatar"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />

          <div className="flex-1 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(createdAt).toDateString()} <br className="sm:hidden" />
                  {new Date(createdAt).toLocaleTimeString()}
                </p>
              </div>
              <PostOptions />
            </div>

            {/* Post text */}
            <p className="mt-3 text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
              {body}
            </p>

            {/* Post image */}
            {image && (
              <div className="mt-3">
                <img
                  src={image || notFoundImg}
                  onError={(e) => (e.target.src = notFoundImg)}
                  alt="Post media"
                  className="mx-auto w-fit max-h-[420px] object-contain rounded-xl border border-gray-100 dark:border-gray-800 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            )}

            {/* Comments */}
            <ul className="mt-3 space-y-3">
              {comments?.length > 0 ? (
                comments.map((c, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={c.commentCreator?.photo || default_avatar}
                        onError={(e) => (e.target.src = default_avatar)}
                        alt="Comment author"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 text-sm">
                        <div className="flex items-center justify-between">
                          <strong className="text-gray-900 dark:text-gray-100">
                            {c.commentCreator?.name || "Unknown"}
                          </strong>
                          <span className="text-xs text-gray-400">
                            {new Date(c.createdAt).toDateString()}
                            <br />
                            {new Date(c.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-gray-200">
                          {c.content || "No content"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-3 text-center text-gray-500 dark:text-gray-400">
                  No comments yet
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-opacity-70"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              onError={(e) => (e.target.src = notFoundImg)}
              alt="Post media"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
