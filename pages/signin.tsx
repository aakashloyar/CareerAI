'use client'
import Heading from '@/components/heading'
import Button from '@/components/button'
import SubHeading from '@/components/subheading'
import InputBox from '@/components/Inputbox'
import BottomWarning from '@/components/Bottomwarning'
import {signIn} from 'next-auth/react'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import { userSignInSchema } from "@/lib/validation"; // Import Zod schema
import {UsersSignInType} from '@/lib/validation'
export default function SignIn() {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState<{ email?: string[], password?: string[], api?: any }>({});
    const router=useRouter();
    async function handleClick(){
        try{
            seterror({});
            const object: { email?: string[], password?:string[],api?:any } = {};
            const validation=userSignInSchema.safeParse({email,password});
            if(!validation.success) {
                const formatted=validation.error.format();
                if(formatted.email?._errors.length) {
                    object.email=formatted.email?._errors;
                }
                if(formatted.password?._errors.length) {
                    object.password=formatted.password?._errors;
                }
                seterror(object);
                return;
            }
            const result=await signIn("credentials",{
                email: email,
                password:password,
                callbackUrl: 'http://localhost:3000' ,
                redirect:false
            });
            console.log(result);
            if(!result?.ok) {
                object.api='invalid credentials'
                seterror(object);
                return;
            }
            router.push('/');
        }catch(err:any) {
            console.log(err);
        }
    }
    return (
        <div className='bg-slate-200 w-full h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='bg-white w-96 rounded-lg'>
                    <div className='text-center pt-8'>
                       <Heading label={'Sign In'}/>
                    </div>
                     <div className='p-2 text-center'>
                        <SubHeading label={'Enter your credential to access your account'}/>
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox handleChange={(e)=>{
                            setemail(e.target.value)
                        }} label={'Email'} placeholder='xxx@gmail.com'/>
                        {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox handleChange={(e)=>{
                            setpassword(e.target.value)
                        }}label={'Password'} placeholder='******'/>
                        {error.password?<div className="text-red-500 text-sm">{error.password}</div>:null}
                    </div>
                    <div className='flex justify-center'>
                        <Button label={'Sign In'} handleClick={()=>handleClick()}/>
                    </div>
                    <div className='flex justify-center'>
                    {error.api?<div className="text-red-500 text-sm">{error.api}</div>:null}
                    </div>

                    <div>
                        <BottomWarning label={'Donot have an Account?'} blabel={'SignUp'} link={'/auth/signup'}/>
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