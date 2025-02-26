

interface ButtonProps {
    label: string;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function({label,handleClick}:ButtonProps) {
    return (
        <div>
            <button className='' onClick={handleClick}>
                <div className='flex'>
                    <div className='px-1'>
                        <img src="/LArrow.png" alt="back" />
                    </div>
                    <div className='hover:underline decoration-white px-1'>
                        {label}
                    </div>
                </div>
            </button>
        </div>
    )
}