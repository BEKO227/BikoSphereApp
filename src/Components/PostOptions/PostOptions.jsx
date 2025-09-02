import React, { use } from 'react'
import { initFlowbite } from 'flowbite'
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PostOptions({Post_id}) {
    useEffect(() => {
        initFlowbite();
    }, []);
    async function handleDelete(){
        let {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${Post_id}`,
        {
            headers:{
                token : localStorage.getItem('token')
            }
        })
        console.log(data)
        if (data.message == "success"){
            toast.success('Post Deleted Successfully')
            setTimeout(() => { 
                window.location.reload();
            }, 2000);
        }else{
            toast.error(data.message)
        }
    }
  return (
    <div>
      <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle={"dropdown"+Post_id} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
        type="button"> 
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
        </svg>
        </button>

        <div id={"dropdown"+Post_id} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> <i class="fa-solid fa-pen-to-square text-amber-400"></i> Edit Post</a>
            </li>
            <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDelete}>
                 <i class="fa-solid fa-trash text-red-600"></i> Delete Post
            </li>
            </ul>
        </div>
    </div>
  )
}
