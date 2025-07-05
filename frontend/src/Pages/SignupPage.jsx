import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../Components/AuthImagePattern'
import toast from "react-hot-toast"

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false)


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })


    const { signup, isSigningUp } = useAuthStore();
    const validateForm = () => {
        //form validate kro
        if (!formData.fullName.trim()) return toast.error("Full name is required")
        if (!formData.email.trim()) return toast.error("Email is required")
        if (!formData.password) return toast.error("Password is required")
        if ((!formData.fullName.trim()) && (!formData.email.trim()) && (formData.password)) return toast.error("Enter the credentials")
        if (formData.password.length < 6) return toast.error("Password length must be atleast 6 character")

        return true; //else
    }
    const handleSubmit = (e) => {

        e.preventDefault()
        console.log("sign u clicked")
        const success = validateForm() //agr validate ho gya hai to, success=true
        if (success === true) return signup(formData)
    }
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
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-4'>
                            {/**full name */}
                            <div className="flex flex-col justify-center items-center space-y-2">
                                <label className="self-start" htmlFor="fullName">Full name</label>

                                <div className="relative w-[20vw]">
                                    <input
                                        id="fullName"
                                        value={formData.fullName}
                                        type="text"
                                        placeholder="Ravi Gupta"
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
                                        placeholder="example@gmail.com"
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
                            <button type='submit' className='bg-blue-900 p-1 rounded-md' disabled={isSigningUp}>
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
            <div className=' w-[50%] h-full flex flex-col justify-center items-center '>
                <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends , share moments , stay in touch with each other."
                />
            </div>
        </div>
    )
}

export default SignupPage