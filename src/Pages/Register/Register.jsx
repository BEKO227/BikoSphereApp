import React from 'react'
import './Register.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Zod from 'zod'; 
import toast from 'react-hot-toast';


const schema = Zod.object({

    name : Zod.string().nonempty("Name is required").min(3,'Minimum length is 3 char') ,
    email: Zod.string().nonempty("Email is required").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please follow this pattern (name@company.com)"),
    password: Zod.string().nonempty("Password is rqequired").regex( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character"),
    rePassword: Zod.string().nonempty('Confirm password is required'),
    gender : Zod.string().nonempty('Gender is required').regex(/^(male|female)$/,'invalud gender'),
    dateOfBirth: Zod.coerce.date().refine((val) => {
      let nowYear = new Date().getFullYear();
      let birthYear = val.getFullYear();
      return (nowYear - birthYear) >= 18;
    }, "Age should be 18 or more"),
  }
).refine((data) => data.password == data.rePassword,{
  message : "Password dosen't match confirm password",
  path : ["rePassword"]
})
export default function Register() {

  let navg = useNavigate();

let { register ,handleSubmit , formState : {errors} } = useForm({
  resolver: zodResolver(schema)
});

  console.log(errors)

  async function handleRegister(value){

    console.log(value)

  let response = await axios.post('https://linked-posts.routemisr.com/users/signup', value).catch((err) => {
    toast.error(err.response.data.error)  
    console.log(err);
  });
  console.log(response);

  if(response?.data?.message == 'success'){
    toast.success('successfully registered')  
    navg('/login');
    }
}

     return (
            <div>
                <div className="container body">
                <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 card">
                  <form onSubmit={handleSubmit(handleRegister)} className="max-w-sm mx-auto">
                  <div className="mb-5">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" id="name" {...register('name')}
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your name"  />
                      {errors.name && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.name.message}</p>}
                    </div>
                    <div className="mb-5">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" id="email" {...register('email',)}
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter your E mail"  />
                      {errors.email && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.email.message}</p>}
                    </div>
                    <div className="mb-5">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                      <input type="password" id="password" {...register('password')} 
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />
                      {errors.password && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.password.message}</p>}
                      </div>
                    <div className="mb-5">
                      <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" id="rePassword" {...register('rePassword')} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />
                      {errors.rePassword && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.rePassword.message}</p>}
                    </div>
                    <div className="mb-5">
                      <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                      <input type="date" id="dateOfBirth" {...register('dateOfBirth')} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />
                      {errors.dateOfBirth && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.dateOfBirth.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select id="gender" {...register('gender')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option defaultValue>Choose your gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                        {errors.gender && <p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.gender.message}</p>}
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                  </form>  
                </div>
                </div>
              </div>
            </div>
          )
        }
        