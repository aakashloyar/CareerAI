import Loader from '@/components/Loader'
export default function({message}:{message:string}) {
    return (
        <div className=''>
            <Loader message={message}/>
        </div>
    )
}