export default function ({label,placeholder,handleChange}:InputProps) {
    return (
        <div className="text-white">
            <div className='font-semibold text-lg'>
                {label}
            </div>
            <div className=''>
                <input type="text" onChange={handleChange} placeholder={placeholder} className='px-2 py-1 w-full rounded-lg border border-white bg-slate-900  ' />
            </div>
        </div>
        
    )
}
interface InputProps {
    label:string,
    placeholder:string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}