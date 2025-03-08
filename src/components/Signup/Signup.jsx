import React, {useState} from 'react'
import authService from '../../appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../../store/authSlice.js'
import {Button, Input, Logo} from '../index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [send,setSend]=useState(false);

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


    const SENDOTP = async(data) => {
        setError("")
        try {
            const userData = await authService.SendOtp(data)
            if(userData){
                setSend(true);
                // console.log(userData);
                
                return userData;
            }
        } catch (error) {
            setError(error.message)
        }
    }


    const VerifyOTP = async(data) => {
        // console.log(userData);
        
        setError("")
        try {
            const userData2 = await authService.verifyOtp(data)
        } catch (error) {
            setError(error.message)
        }
    }



  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

               {!send? (<form onSubmit={handleSubmit(SENDOTP)}>
                <div className='space-y-5'>
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Button type="submit" className="w-full">
                            Get Otp
                        </Button>
                    </div>
                </form>)

                 :(<form onSubmit={handleSubmit(VerifyOTP)}>
                <Input
                        label="Otp: "   
                        type="text"
                        placeholder="Enter your Otp"
                        {...register("text", {
                            required: true,})}
                        />
                <Button type="submit" className="w-full my-3">
                            Submit Otp
                        </Button>
                </form>) }
                



            </div>

    </div>
  )
}

export default Signup
