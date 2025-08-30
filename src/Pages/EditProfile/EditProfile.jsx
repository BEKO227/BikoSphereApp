import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';

export default function EditProfile() {
    let { getUserData }= useContext(UserContext)
    let {register,handleSubmit, }= useForm()
   async function uploadImgProfile(val){
        let Img = val.photo[0]
        let formData = new FormData();
        formData.append('photo', Img)
        let{data}= await axios.put('https://linked-posts.routemisr.com/users/upload-photo', formData ,{
            headers:{
                token: localStorage.getItem('token')
            }})
        console.log(data) 
        if(data.message == 'success'){
            getUserData()
            toast.success('Profile Photo changed successfully')
            window.location.reload()
        }else{
            toast.error(data.error)    
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(uploadImgProfile)}>
            
            <div className="flex items-center justify-center w-3/4 mx-auto mt-3">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input {...register('photo')} id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center w-3/4 mx-auto mt-3">
            Upload photo
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            </button>
        </form>
    </div>
  )
}
