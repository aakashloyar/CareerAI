export default function({heading,subheading,imglink}:cardProps){
    return (
        <div className='border-2 border-gray-500 hover:border-white transition rounded-3xl w-56 h-52 px-4'>
            <div className='flex justify-center pb-3 pt-2'>
                <img src={imglink} alt="image" />
            </div>
            <div className='fond-bold text-center pb-1 text-xl'>
                {heading}
            </div>
            <div className='text-center text-sm text-gray-400'>
                {subheading}
            </div>
        </div>
    )
}
interface cardProps {
    heading:string,
    subheading:string,
    imglink:string
}