"use client"
import {useState} from 'react'
import SignUp from '@/pages/signup'
import Loader from '@/components/Loader'
export default function() {
    const [success,setSuccess]=useState<boolean>(false);
    return (
        <div>
            {success?<Loader message={"Signup Successful redirecting to signin"}/>:<SignUp setSuccess={setSuccess}/> }
        </div>
    )
}