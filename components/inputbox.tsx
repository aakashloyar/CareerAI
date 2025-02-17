export default function ({label,placeholder}:InputProps) {
    return (
        <div className="">
            <div className='font-semibold text-lg'>
                {label}
            </div>
            <div className=''>
                <input type="text" placeholder={placeholder} className='px-2 py-1 w-full rounded-lg border border-gray-200' />
            </div>
        </div>
        
    )
}
interface InputProps {
    label:string,
    placeholder:string
}