"use client"

interface ButtonProps {
    label: string;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function Button({label,handleClick}:ButtonProps) {
    return (
        <div className='p-2 w-full' >
            <button className='bg-white rounded-lg w-full text-slate-900 px-3 py-3' onClick={handleClick}>{label}</button>
        </div>
    )
}