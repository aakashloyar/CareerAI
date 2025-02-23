"use client"

interface ButtonProps {
    label: string;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function Button({label,handleClick}:ButtonProps) {
    return (
        <div className='p-2 w-full' >
            <button className='bg-slate-900 rounded-lg w-full text-white px-1 py-3' onClick={handleClick}>{label}</button>
        </div>
    )
}