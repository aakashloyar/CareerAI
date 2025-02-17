
export default function SubHeading({label}:SubHeadingProps) {
    return (
        <div className='text-xl text-slate-600'>
            {label}
        </div>
    )
}





interface SubHeadingProps {
    label:string
}
