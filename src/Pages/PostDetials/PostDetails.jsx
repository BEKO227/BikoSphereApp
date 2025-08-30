import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import default_avatar from "../../../src/assets/default-profile.png";
import notFoundImg from "../../../src/assets/Image_not_available.png";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostDetails();
  }, []);

  async function getPostDetails() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setPost(data.post);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  if (!post) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  const { _id, body, image, user, createdAt, comments } = post;
  const { name, photo } = user || {};

  return (
    <div className="my-5 max-w-1/2 max-h-3/4 mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="flex items-start w-full mx-auto gap-4 p-4">
        {/* Avatar */}
        <img
          src={photo || default_avatar}
          alt="Author avatar"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(createdAt).toDateString()}
                <br />
                {new Date(createdAt).toLocaleTimeString()}
              </p>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
              title="More options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12h.01M12 12h.01M18 12h.01"
                />
              </svg>
            </button>
          </div>

          {/* Post text */}
          <p className="mt-3 text-gray-800 dark:text-gray-200 leading-relaxed">
            {body}
          </p>

          {/* Post image */}
          <div className="mt-4">
            <img
              src={image || notFoundImg}
              onError={(e) => (e.target.src = notFoundImg)}
              alt="Post media"
              className="w-full max-h-[420px] object-cover rounded-xl border border-gray-100 dark:border-gray-800"
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
            <button className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              💬 <span>{comments?.length || 0}</span>
            </button>
            <Link
              to={"/PostDetails/" + _id}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              See post Details
            </Link>
          </div>

          {/* Comment box */}
          <div className="mt-4 flex gap-2 items-start">
            <input
              className="flex-1 px-3 py-2 rounded-lg border text-white border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Write a comment..."
            />
            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
              Post
            </button>
          </div>

          {/* Comments list */}
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
  );
}
