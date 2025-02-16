interface ButtonProps {
    label: string;
}


export default function Button({label}:ButtonProps) {
    return (
        <button className=''>{label}</button>
    )
}