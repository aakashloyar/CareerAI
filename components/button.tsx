interface ButtonProps {
    label: string;
}


export default function Button({label}:ButtonProps) {
    return (
        <div className='p-6 w-full'>
            <button className='bg-slate-900 rounded-lg w-full text-white px-1 py-3'>{label}</button>
        </div>
    )
}