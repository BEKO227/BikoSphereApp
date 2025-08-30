import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Zod from 'zod';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
export default function Login() {
    
    let{ getUserData } = useContext(UserContext )
    let navg = useNavigate()

    const schema = Zod.object({
        
        email: Zod.string().nonempty("Email is required").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please follow this pattern (name@company.com)"),
        password: Zod.string().nonempty("Password is required")

    })
    
    const{register,handleSubmit , formState : {errors} } =  useForm({
        resolver : zodResolver(schema)
    }
    )
    console.log(errors)
    async function handleLogin(value){
        console.log(value)
        let response = await axios.post('https://linked-posts.routemisr.com/users/signin',value).catch((err) => {
            console.log(err)
            toast.error(err.response.data.error)
        })
        console.log(response)
        if(response?.data?.message == "success"){
            localStorage.setItem('token',response.data.token)
            toast.success('successfully loggedin') 
            getUserData(); 
            navg('/')
        }
    }
  return (
             <div>
              <div className="container body">
                <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" {...register('email')} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"  />
                            {errors.email && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" {...register('password')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                            {errors.password && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.password.message}</p>}
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <NavLink to="/Register" className="text-blue-700 hover:underline dark:text-blue-500">Register</NavLink>
                        </div>
                    </form>
                    </div>
                </div>
              </div>
            </div>
  )
}
