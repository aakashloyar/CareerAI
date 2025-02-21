"use client"

interface ButtonProps {
    label: string;
    handleClick:()=>void;
    
}


export default function Button({label,handleClick}:ButtonProps) {
    return (
        <div className='p-2 w-full' onClick={handleClick}>
            <button className='bg-slate-900 rounded-lg w-full text-white px-1 py-3'>{label}</button>
        </div>
    )
}