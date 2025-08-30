import React, { useState,useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from './../../Context/UserContext';
import axios from 'axios';
import default_avatar from '../../../src/assets/default-profile.png'
import { Link } from 'react-router-dom';

export default function Profile() {

let {user } = useContext(UserContext)
let [postsList , setPostsList]= useState([])
let [loading, setLoading] = useState(true);

useEffect(()=>{
  getUserPosts()
},[])
  async function getUserPosts(){
    setLoading(true);
    let {data} = await axios.get(`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?`,
      {
        headers:{
          token : localStorage.getItem('token')
        }
      }
    )
    console.log(data)
    if (data.message == 'success'){
      setPostsList(data.posts)
      setLoading(false);
    }
}
      


  return (
    <div>
    <div className="flex items-center justify-center w-1/2 mx-auto mt-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
        <div className="flex flex-col items-center">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photo || "/default-avatar.png"} alt="User Image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Joined {new Date(user?.createdAt).toDateString()}</span>
            <span className="text-m dark:text-white mt-1">{user?.email}</span>
            <span className="text-m dark:text-white mt-1"> Birthday : {new Date(user?.dateOfBirth).toDateString()}</span>
        </div>
    </div>
        <div>
          <div className="container">
            { loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : postsList.map((post)=>{
              let {_id , body , image , user : {name, photo}, createdAt , comments } = post
              return   <div key={_id} className="my-5 max-w-1/2 max-h-3/4 mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="flex items-start w-full mx-auto gap-4 p-4">
                {/* Avatar */}
                <img
                  src={photo}
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
                      💬 <span>{comments.length}</span>
                    </button>
                    <Link  to={'/PostDetails/'+ _id} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">See post Details</Link>
                  </div>
            
                  {/* Comment box */}
                  <div className="mt-4 flex gap-2 items-start">
                    <input
                      className="flex-1 px-3 py-2 rounded-lg border text-white border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Write a comment..."
                    />
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                      Post
                    </button>
                  </div>
            
                  {/* Comments list */}
                  <ul className="mt-3 space-y-3">
                    <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start gap-3">
                      <img
                          src={
                            comments?.length > 0
                              ? comments[comments.length - 1]?.commentCreator?.photo || default_avatar
                              : default_avatar
                          }
                          onError={(e) => (e.target.src = default_avatar)}
                          alt="Author avatar"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 text-sm">
                          <div className="flex items-center justify-between">
                            <strong className="text-gray-900 dark:text-gray-100">{comments?.length > 0
                              ? comments[comments.length - 1]?.commentCreator?.name || "Unknown"
                              : "No comments yet"}</strong>
                            <span className="text-xs text-gray-400">
                            {comments?.length > 0
                              ? new Date(comments[comments.length - 1]?.createdAt).toDateString()
                              : ""}
                            <br />
                            {comments?.length > 0
                              ? new Date(comments[comments.length - 1]?.createdAt).toLocaleTimeString()
                              : ""}</span>
                          </div>
                          <p className="mt-1 text-gray-700 dark:text-gray-200">
                            {comments?.length > 0
                            ? comments[comments.length - 1]?.content || "No content"
                            : "No comments yet"}
                            </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            })}
          </div>
        </div>
    </div>
  )
}
