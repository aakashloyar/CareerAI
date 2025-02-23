"use client"

import {useState} from 'react'
import { userSignUpSchema } from "@/lib/validation"; // Import Zod schema
import Heading from '../components/heading'
import Button from '../components/button'
import SubHeading from '../components/subheading'
import InputBox from '../components/inputbox'
import BottomWarning from '../components/Bottomwarning'
import {signIn} from 'next-auth/react'
import {UsersSignUpType} from '@/lib/validation'
import {useRouter} from 'next/navigation'
import axios from 'axios'
export default function SignUp() {
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const router=useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({}); // ✅ State for field-specific errors
    return (
        <div className='bg-slate-200 w-full h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='bg-white w-96 rounded-lg'>
                    <div className='text-center pt-8'>
                       <Heading label={'Sign up'}/>
                    </div>
                    <div className='p-2 text-center'>
                       <SubHeading label={'Enter your information to create an account'}/>
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox handleChange={(e)=>{
                            setfirstName(e.target.value)
                        }}label={'First Name'} placeholder='John'/>
                        {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox handleChange={(e)=>{
                            setlastName(e.target.value)
                        }} label={'Last Name'} placeholder='Doe'/>
                        {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox handleChange={(e)=>{
                            setemail(e.target.value)
                        }} label={'Email'} placeholder='xxx@gmail.com'/>
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox handleChange={(e)=>{
                            setpassword(e.target.value)
                        }} label={'Password'} placeholder='******'/>
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>
                    <div className='flex justify-center'>
                        <Button label={'Sign Up'} 
                        handleClick={()=>submit({firstName:firstName,lastName:lastName,email:email,password:password},router,setErrors)}
                        />
                    </div>

                    <div>
                        <BottomWarning label={'Already have an Account?'} blabel={'Signin'}/>
                    </div>
                    <div className='flex justify-center pt-4 pb-1'>
                        <div className='px-2'>
                            <button onClick={() => signIn('google' ,{callbackUrl: 'http://localhost:3000' })}>
                                    <img src="/google.png" alt="Sign in with Google" />
                            </button>
                        </div>

                        <div className='px-2'>
                            <button onClick={() => signIn('github' ,{callbackUrl: 'http://localhost:3000' })}>
                                    <img src="/github.png" alt="Sign in with Github" />
                            </button>
                        </div>

                        

                    </div>
                    
                </div>
            </div>
        </div>
    )
}

async function submit(user: UsersSignUpType,router: ReturnType<typeof useRouter>, 
    setErrors: (errors: Record<string, string>) => void) {
    setErrors({}); // Clear previous errors
    const validationResult = userSignUpSchema.safeParse(user);
    if (!validationResult.success) {
        const formattedErrors: Record<string, string> = {};
        const errorDetails = validationResult.error.format();
    
        if (errorDetails.firstName?._errors.length) {
          formattedErrors.firstName = errorDetails.firstName._errors[0];
        }
        if (errorDetails.lastName?._errors.length) {
          formattedErrors.lastName = errorDetails.lastName._errors[0];
        }
        if (errorDetails.email?._errors.length) {
          formattedErrors.email = errorDetails.email._errors[0];
        }
        if (errorDetails.password?._errors.length) {
          formattedErrors.password = errorDetails.password._errors[0];
        }
        console.log(validationResult);
        setErrors(formattedErrors);
        return;
    }
    try {
      const { data } = await axios.post("/api/auth/signup", user);
      router.push('/');

    } catch (err: any) {
        setErrors({ api: err.response?.data?.message || "Signup failed. Please try again." });

    }    
};



