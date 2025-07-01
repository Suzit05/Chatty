import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false)


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })


    const { signup, isSigningUp } = useAuthStore();
    const validateForm = () => { }
    const handleSubmit = (e) => { e.preventDefault() }
    return (
        <div className=' w-full h-screen flex justify-center items-center'>
            {/**left side */}
            <div className=' w-[50%] h-full flex flex-col  items-center'>
                <div className='h-[30%] flex flex-col justify-center space-y-4'>
                    <div className='self-center'><MessageSquare /></div>
                    <div className=' text-center'><h2>Create Account</h2>
                        <h5>Get started with your free account</h5>
                    </div>
                </div>
                <div>
                    <form >
                        <div className='flex flex-col space-y-4'>
                            {/**full name */}
                            <div className="flex flex-col justify-center items-center space-y-2">
                                <label className="self-start" htmlFor="fullName">Full name</label>

                                <div className="relative w-[20vw]">
                                    <input
                                        id="fullName"
                                        value={formData.fullName}
                                        type="text"
                                        placeholder="John Doe"
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-md p-2 pr-10"
                                    />
                                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                                </div>
                            </div>
                            {/**email */}
                            <div className="flex flex-col justify-center items-center space-y-2">
                                <label className="self-start" htmlFor="fullName">email</label>

                                <div className="relative w-[20vw]">
                                    <input
                                        value={formData.email}
                                        type="email"
                                        placeholder="John@gmail.com"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border border-zinc-200 rounded-md p-2 pr-10"
                                    />
                                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                                </div>
                            </div>
                            {/**Password */}
                            <div className="flex flex-col justify-center items-center space-y-2">
                                <label className="self-start" htmlFor="fullName">password</label>

                                <div className="relative w-[20vw]">
                                    <input
                                        value={formData.password}
                                        type={showPassword ? "text" : "password"}
                                        placeholder='*******'
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                                        className="w-full border border-zinc-200 rounded-md p-2 pr-10"
                                    />
                                    <button
                                        type='button'
                                        onClick={() => { setShowPassword(!showPassword) }}>

                                        {showPassword ?
                                            (<EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />)
                                            : (<Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />)}
                                    </button>


                                </div>
                            </div>
                            <button type='submit' className='bg-purple-500 p-1 rounded-md' disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <>
                                        <Loader2 className='size-5 animate-spin' />
                                        Loading....
                                    </>

                                ) : ("Create Account")}
                            </button>
                        </div>
                    </form>
                    <div className='flex space-x-2'>
                        <p>Already have an account?</p>
                        <Link to="/login" className="link link-primary text-blue-600">Sign in</Link>
                    </div>


                </div>
            </div>
            {/**right side */}
            <div className='bg-pink-500 w-[50%] h-full flex flex-col justify-center items-center '>w</div>
        </div>
    )
}

export default SignupPage