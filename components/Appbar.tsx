"use client"
import {signIn,signOut} from 'next-auth/react'
import Button from '@/components/button'
import Dropdown from "@/app/_components/dropdown"
import Link from "next/link";

export default function AppBar(){
    return (
      <div className='bg-black w-full h-14 text-white flex flex-col justify-center border-b-1 border-slate-100 fixed z-50 mb-0'>
        <div className='grid grid-cols-12'>
          <div className='col-span-2 flex items-center justify-center'>
            <Link href="/">
            <button className="">
              <div className='text-md md:text-2xl font-bold '>
                CarrerAI
              </div>
            </button>
            </Link>
          </div>
        
          
          <div className='col-span-6'>
  
          </div>
          <div className='col-span-4 flex justify-center'>
            {/* <div>
              <Button handleClick={() => signIn()} label={'SignIn'}/>
            </div>
            <div>
              <Button handleClick={() => signOut()} label={'SignOut'}/>  
            </div> */}
            <Dropdown/>
          </div>
        </div>
      </div>
    )
  }