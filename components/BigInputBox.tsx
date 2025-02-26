export default function ({label,placeholder,handleChange}:InputProps) {
    return (
        <div className="text-white">
            <div className='font-semibold text-lg'>
                {label}
            </div>
            <div className='h-40'>
                <textarea onChange={handleChange} placeholder={placeholder} className='px-2 py-1 w-full h-full rounded-lg border border-white bg-slate-900  ' />
            </div>
        </div>
        
    )
}
interface InputProps {
    label:string,
    placeholder:string,
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}