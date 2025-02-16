
export default function SubHeading({label}:SubHeadingProps) {
    return (
        <div className='text-lg font-semibold'>
            {label}
        </div>
    )
}





interface SubHeadingProps {
    label:string
}
