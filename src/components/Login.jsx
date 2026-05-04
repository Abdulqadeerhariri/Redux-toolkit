import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Logo, Button, Input } from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-[calc(100vh-200px)] px-4'>
            <div className="mx-auto w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[120px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-white mb-2">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-base text-gray-400 mb-8">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(login)} className='space-y-6'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatt: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login