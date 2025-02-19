export default function AppBar(){
    return (
      <div className='bg-black w-full h-14 text-white flex flex-col justify-center border-b-1 border-slate-100 fixed'>
        <div className='grid grid-cols-12'>
          <div className='col-span-2 text-2xl font-bold flex justify-center'>
            CarrerAI
          </div>
          <div className='col-span-6'>
  
          </div>
          <div className='col-span-4 flex justify-center'>
            Signin
          </div>
        </div>
      </div>
    )
  }