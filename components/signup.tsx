import Heading from './heading'
import Button from './button'
import Subheading from './subheading'

export default function SignUp() {
    return (
        <div className='bg-slate-200 w-full h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='bg-white w-80 rounded'>
                    <div className='text-center'>
                       <Heading label={'SignUp'}/>
                    </div>

                </div>
            </div>
        </div>
    )
}