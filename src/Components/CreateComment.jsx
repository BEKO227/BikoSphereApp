import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import default_avatar from "../assets/default-profile.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateComment({ postId }) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState({});

  async function handleAddComment() {

    if (!newComment[postId] || !newComment[postId].trim()) {
      toast.error("Comment cannot be empty");
      return;
    }


      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/comments",
        {
          content: newComment[postId], 
          post: postId,                
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      data.comments.forEach(comment => {
        console.log(comment.commentCreator.photo);
      });
      if (data.message === "success") {
        toast.success("Comment added successfully");

        setNewComment({ ...newComment, [postId]: "" });

        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error(data.message);
      }
  }

  return (
    <div className="flex items-center gap-3 mt-3">
      {/* User Avatar */}
      <img
        src={user?.photo || default_avatar}
        alt="Your avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Comment Input */}
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 px-4 py-2 text-sm rounded-full border border-gray-300 
                   dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:outline-none"
        value={newComment[postId] || ""}
        onChange={(e) =>
          setNewComment({ ...newComment, [postId]: e.target.value })
        }
      />

      {/* Post Button */}
      <button
        onClick={handleAddComment}
        className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 
                   rounded-full focus:outline-none"
      >
        Post
      </button>
    </div>
  );
}
