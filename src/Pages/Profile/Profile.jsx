import React, { useState,useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from './../../Context/UserContext';
import axios from 'axios';
import default_avatar from '../../../src/assets/default-profile.png'
import { Link } from 'react-router-dom';
import PostOptions from '../../Components/PostOptions/PostOptions';


export default function Profile() {

let {user } = useContext(UserContext)
let [postsList , setPostsList]= useState([])
let [loading, setLoading] = useState(true);
let [selectedImage, setSelectedImage] = useState(null);


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
    <div className='w-full max-w-5xl mx-auto px-3 sm:px-5 my-5'>
    <div className="flex items-center justify-center w-1/2 mx-auto mt-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
        <div className="flex flex-col items-center">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photo || "/default-avatar.png"} alt="User Image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Joined {new Date(user?.createdAt).toDateString()}</span>
            <span className="text-m dark:text-white mt-1">{user?.email}</span>
            <span className="text-m dark:text-white mt-1"> Birthday : {new Date(user?.dateOfBirth).toDateString()}</span>
        </div>
    </div>
      {/* Posts list */}
      <div>
        { loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : postsList.map((post) => {
          let {_id, body, image, user: {name, photo}, createdAt, comments} = post
          return (
            <div 
              key={_id} 
              className="my-4 w-3/4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm 
                         border border-gray-100 dark:border-gray-800 overflow-hidden mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4">
                
                {/* Avatar */}
                <img
                  src={photo}
                  alt="Author avatar"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
  
                <div className="flex-1 w-full">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(createdAt).toDateString()} <br className="sm:hidden" />
                        {new Date(createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <PostOptions/>
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
                        className="mx-auto w-fit max-h-[320px] sm:max-h-[420px] object-contain rounded-xl border 
                                   border-gray-100 dark:border-gray-800 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                    </div>
                  )}
  
                  {/* Actions */}
                  <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <button className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                      💬 <span>{comments.length}</span>
                    </button>
                    <Link  
                      to={'/PostDetails/'+ _id} 
                      className="text-center w-full sm:w-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                                 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                                 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                      See post Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
  
      {/* Image Modal (already responsive) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
             onClick={() => setSelectedImage(null)}>
          <div 
            className="relative w-full max-w-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 
                         flex items-center justify-center text-xl hover:bg-opacity-70"
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
  )
}
