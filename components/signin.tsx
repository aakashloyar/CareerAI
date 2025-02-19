'use client'
import Heading from './heading'
import Button from './button'
import SubHeading from './subheading'
import InputBox from './inputbox'
import BottomWarning from './Bottomwarning'
import {signIn} from 'next-auth/react'
export default function SignIn() {
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
                       <InputBox label={'Email'} placeholder='xxx@gmail.com'/>
                    </div>
                    <div className='px-4 py-1'>
                       <InputBox label={'Password'} placeholder='******'/>
                    </div>
                    <div className='flex justify-center'>
                        <Button label={'Sign In'} handleClick={function(){
                            console.log('button clicked')
                        }}/>
                    </div>

                    <div>
                        <BottomWarning label={'Donot have an Account?'} blabel={'SignUp'}/>
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