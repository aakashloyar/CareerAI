
export default function Heading({label}:HeadingProps) {
    return (
        <div className='text-4xl font-bold'>
            {label}
        </div>
    )
}





interface HeadingProps {
    label:string
}
