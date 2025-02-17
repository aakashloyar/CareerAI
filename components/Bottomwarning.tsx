

export default function BottomWarning({label,blabel}:BottomWarningP) {
    return (
        <div className=''>
            <div className='flex justify-center'>
                <div className='text-md'>
                    {label}
                </div>
                <div className='px-1'>
                    <button className="underline">{blabel}</button>
                </div>
            </div>
        </div>
    )
}



interface BottomWarningP {
    label: string;
    blabel:string
}
