
export default function ({message}:{message:string}) {
    return (
      <div className="flex flex-col justify-center min-h-screen">
        <div className="flex justify-center items-center">
            <img src="/spinner.gif" alt="spinner" />
        </div>
        <div className="flex justify-center items-center text-green-900 font-bold text-xl pt-4">
            {message}
        </div>
      </div> 
      
    );
  }
  