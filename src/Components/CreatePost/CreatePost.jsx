import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import ImageModal from '../ImageModal/ImageModal'

export default function CreatePost() {
  let { user } = useContext(UserContext)
  let { register, handleSubmit } = useForm()
  let fileinput = useRef()

  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  // when user uploads file
  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setSelectedFile(file)
      setShowModal(true)
    }
  }

  async function handleCreatePost(value) {
    if (!selectedFile && !value.body) {
      toast.error("Please write something or upload an image")
      return
    }

    let formData = new FormData()
    formData.append('body', value.body)
    if (selectedFile) formData.append('image', selectedFile)

    let { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
      headers: {
        token: localStorage.getItem('token')
      }
    })

    if (data.message === 'success') {
      toast.success('Post created successfully')
      setTimeout(() => window.location.reload(), 500)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <>
      {/* modal */}
      {showModal && (
        <ImageModal
          preview={preview}
          onAccept={() => setShowModal(false)}
          onDecline={() => {
            setShowModal(false)
            setPreview(null)
            setSelectedFile(null)
            if (fileinput.current) fileinput.current.value = ""
          }}
        />
      )}

      {/* form */}
      <form onSubmit={handleSubmit(handleCreatePost)} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Post Something
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <img
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
            src={user?.photo || "/default-avatar.png"}
            alt="User avatar"
          />
          <div className="flex-1">
            <input
              {...register('body')}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your post here..."
            />
          </div>
          <input type="file" className="hidden" id="uploadimg" ref={fileinput} onChange={handleFileChange} />
          <label htmlFor="uploadimg">
            <i className="fa-solid fa-image dark:text-gray-400 text-2xl cursor-pointer"></i>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
        >
          Create Post
        </button>
      </form>
    </>
  )
}
