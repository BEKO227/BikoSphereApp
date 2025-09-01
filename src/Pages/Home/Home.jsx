import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import default_avatar from '../../../src/assets/default-profile.png'
import notFoundImg from '../../../src/assets/Image_not_available.png'
import CreatePost from '../../Components/CreatePost/CreatePost'
import PostOptions from './../../Components/PostOptions/PostOptions';

export default function Home() {
  let [postsList , setPostsList] = useState([])
  let [loading, setLoading] = useState(true);
  let [selectedImage, setSelectedImage] = useState(null);

  useEffect(()=>{
    getAllPosts()
  },[])

  async function getAllPosts(){
    setLoading(true);
    let {data} = await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
      { headers:{ token : localStorage.getItem('token') } }
    )
    if (data.message === 'success'){
      setPostsList(data.posts)
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-5 my-5">
      {/* Create post */}
      <div className="my-5 w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <CreatePost/>
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
              className="my-4 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm 
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
